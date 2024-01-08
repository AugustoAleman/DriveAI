package com.driveai.usersms.service;

import com.driveai.usersms.clients.DocumentsClient;
import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.AddressRepository;
import com.driveai.usersms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DocumentsClient documentsClient;

    public Address saveAddress(Address address) throws Exception {
        System.out.println("\n\n Entering saveeeeee \n\n");

        System.out.println(address.toString());

        // Validar si la dirección ya existe en la base de datos
        if (address.getId() != 0) {
            System.out.println("Address id: " + address.getId());
            Optional<Address> existingAddress = addressRepository.findById(address.getId());

            if (existingAddress.isPresent()) {
                if (existingAddress.get().getUserId() != address.getUserId()) {
                    throw new Exception("User does not have permission to update this address");
                }
                // Validar que los campos de la dirección sean válidos
                if (address.getState() == null || address.getState().isEmpty()) {
                    throw new Exception("State cannot be null or empty");
                }

                if (address.getCity() == null || address.getCity().isEmpty()) {
                    throw new Exception("City cannot be null or empty");
                }

                if (address.getAddress() == null || address.getAddress().isEmpty()) {
                    throw new Exception("Address cannot be null or empty");
                }

                if (address.getPostal() == null || address.getPostal().isEmpty()) {
                    throw new Exception("Postal cannot be null or empty");
                }

                if (address.getPostal().length() != 5) {
                    throw new Exception("Postal code must be 5 digits");
                }

                //Si el address que te llega tiene main = true, entonces se debe actualizar el address que ya existe con main = true a main = false
                if (address.getIsMain() == true) {
                    Optional <Address> existingMainAddress = addressRepository.findByUserIdAndIsMain(address.getUserId(), true);
                    if (existingMainAddress.isPresent()) {
                        Address mainAddress = existingMainAddress.get();
                        mainAddress.setIsMain(address.getId() == existingMainAddress.get().getId());
                        mainAddress.setDate_to(new Date());
                        addressRepository.save(mainAddress);
                    }
                }
                // Actualizar la dirección en la base de datos
                address.setUpdatedAt(new Date());
                address.setCreatedAt(existingAddress.get().getCreatedAt());
                address.setDate_from(existingAddress.get().getDate_from());
                return addressRepository.save(address);

            } else {
                throw new Exception("Address with id: " + address.getId() + " does not exist");
            }
        }
        else {

            // Create the new address in the database

            // First check if user in db exists
            Optional<User> userinDB = userRepository.findById(address.getUserId());

            if (!userinDB.isPresent()) // if it does not exist
            {
                throw new Exception("User referenced in address dont exist");
            }

            address.setCreatedAt(new Date());
            address.setUpdatedAt(new Date());
            address.setDate_from(new Date());

            //Si el address que te llega tiene main = true, entonces se debe actualizar el address que ya existe con main = true a main = false

            if (address.getIsMain())
            {
                System.out.println("\n\n Checking if its maaaaaain \n\n");
                Optional<Address> existingMainAddress = addressRepository.findByUserIdAndIsMain(address.getUserId(), true);

                if (existingMainAddress.isPresent()) {
                    System.out.println("\n\n Changing address to not main \n\n");
                    Address mainAddress = existingMainAddress.get();
                    mainAddress.setIsMain(false);
                    mainAddress.setDate_to(new Date());
                    addressRepository.save(mainAddress);
                }
            }

            // address.setIsMain(true);
            System.out.println("\n\n Adding new main address \n\n");
            System.out.println(address.toString());

            //Añadele al address el usuario
            address.setUserId(userinDB.get().getId());
            return addressRepository.save(address);
        }
    }

    public Address findById(int id, int userId) throws Exception {
        if (id == (int)id) { // Validation to check if it is an integer
            if (id != 0 && id > 0) { // Validation to check if it is not zero or less than zero
                Optional<Address> addressinDB = addressRepository.findById(id);
                if (addressinDB.isPresent()) { // Validation to check if id exist in DB and was not deleted
                    Address address = addressinDB.get();
                    if (address.getDeletedAt() == null) {
                        if (address.getUserId() == userId) { // Validar si la dirección está relacionada con el usuario
                            return address; // Address is found and retrieved
                        } else {
                            throw new Exception("Address does not belong to the specified user");
                        }
                    } else {
                        throw new Exception("Address is already deleted");
                    }
                } else {
                    throw new Exception("Address with id: " + id + " does not exist");
                }
            } else {
                throw new Exception("The id cannot be zero, less than zero");
            }
        } else {
            throw new Exception("The id is not an integer");
        }
    }

    public Optional<Address> findMainAddressById(int userId) throws Exception{

        try {
            Optional<Address> mainAddress = addressRepository.findByUserIdAndIsMain(userId, true);
            //Validar que no este borrado
            if (mainAddress.isPresent()) {
                if (mainAddress.get().getDeletedAt() == null) {
                    return mainAddress;
                } else {
                    throw new Exception("Main address is deleted");
                }
            }
        } catch (Exception e) {
            throw new Exception("Main address not found");
        }
        return null;
    }

    public void deleteAddressById( int id, int userId) throws Exception{
        Optional<Address> optionalAddress = addressRepository.findById(id);

        if (optionalAddress.isEmpty()) {
            throw new Exception("Address with id " + id + " not found");
        }

        Address address = optionalAddress.get();

        if (address.getUserId() != userId) {
            throw new Exception("User does not have permission to delete this address");
        }

        if (address.getDeletedAt() != null) {
            throw new Exception("Address with id " + id + " has already been deleted");
        }

        address.setDeletedAt(new Date());
        address.setIs_deleted(true);
        address.setIsMain(false);
        address.setDate_to(new Date());

        addressRepository.save(address);

    }

    public List<Address> listAllAddressByUserId(int userId) throws Exception {
        // Buscar todas las direcciones del usuario en la base de datos
        List<Address> addresses = addressRepository.findByUserId(userId);
        //Eliminar los que esten eliminados usando el campo deletedAt de la tabla address
        for (int i = 0; i < addresses.size(); i++) {
            if (addresses.get(i).getDeletedAt() != null || addresses.get(i).isIs_deleted()) {
                addresses.remove(i);
                i--;
            }
        }

        // Verificar si se encontraron direcciones
        if (addresses.isEmpty()) {
            throw new Exception("No addresses found for user with id: " + userId);
        }

        return addresses;
    }

}

