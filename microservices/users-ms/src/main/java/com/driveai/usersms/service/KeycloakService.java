package com.driveai.usersms.service;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

@Service
public class KeycloakService {

    @Value("${kcUrl}")
    private String keyCloakServer;

    @Value("${kcRealm}")
    private String realm;

    @Value("${kcClient}")
    private String clientId;

    @Value("${kcAdminUsername}")
    private String username;

    @Value("${kcAdminPassword}")
    private String password;

    private Keycloak keycloak;
    private String serverUrl;

    @PostConstruct
    public void init() {
        this.serverUrl = "https://" + keyCloakServer + "/auth";
        this.keycloak = KeycloakBuilder.builder()
                .serverUrl(this.serverUrl)
                .realm(this.realm)
                .username(this.username)
                .password(this.password)
                .clientId(this.clientId)
                .build();
    }

    public void createUser(String username, String firstName, String lastName, String email, String password, String roleName) throws Exception {
        // configuration
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);

        //credentials
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);

        user.setCredentials(Arrays.asList(passwordCred));

        // keycloak.realm("drive-ai").users().create(user);

        Response response = keycloak.realm(realm).users().create(user);
        if (response.getStatus() == 201) {
            String userId = CreatedResponseUtil.getCreatedId(response);
            System.out.println("User created with userId: " + userId);

            // realm
            RealmResource realmResource = keycloak.realm(realm);

            // client
            ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(realm).get(0);
            String clientId = clientRepresentation.getId();

            // role
            RoleRepresentation roleRepresentation = realmResource.clients().get(clientId).roles().get(roleName).toRepresentation();

            realmResource.users().get(userId).roles().clientLevel(clientId).add(Arrays.asList(roleRepresentation));
        } else {
            throw new Exception("Error creating user in Keycloak: " + response.getStatusInfo());
        }
    }


    public void deleteUser(String username, String userRole) throws Exception {
        // realm
        RealmResource realmResource = keycloak.realm(realm);

        // client
        ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(realm).get(0);
        String clientId = clientRepresentation.getId();

        // role
        RoleRepresentation roleRepresentation = realmResource.clients().get(clientId).roles().get(userRole).toRepresentation();

        // user
        UserRepresentation userRepresentation = realmResource.users().search(username).get(0);

        // user roles
        realmResource.users().get(userRepresentation.getId()).roles().clientLevel(clientId).remove(Arrays.asList(roleRepresentation));

        // Delete the user
        realmResource.users().delete(userRepresentation.getId());
    }

    public void updateUser(String username, String firstName, String lastName, String email, String userRole) throws Exception {
        // Get the realm
        RealmResource realmResource = keycloak.realm(realm);

        // Get the client
        ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(realm).get(0);
        String clientId = clientRepresentation.getId();

        // Get the role
        RoleRepresentation roleRepresentation = realmResource.clients().get(clientId).roles().get(userRole).toRepresentation();

        // Get the user
        UserRepresentation userRepresentation = realmResource.users().search(username).get(0);

        // Update the user
        userRepresentation.setFirstName(firstName);
        userRepresentation.setLastName(lastName);
        userRepresentation.setEmail(email);

        // Get the user's current roles
        List<RoleRepresentation> currentRoles = realmResource.users().get(userRepresentation.getId()).roles().clientLevel(clientId).listAll();

        // Remove the user's current roles
        realmResource.users().get(userRepresentation.getId()).roles().clientLevel(clientId).remove(currentRoles);

        // Add the user's new roles
        realmResource.users().get(userRepresentation.getId()).roles().clientLevel(clientId).add(Arrays.asList(roleRepresentation));
        realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
    }

    public void changeEmail(String username, String email) throws Exception {
        // the process should update both username and email to the same value (new email)
        // Get the realm
        RealmResource realmResource = keycloak.realm(realm);

        // Get the user
        UserRepresentation userRepresentation = realmResource.users().search(username).get(0);

        // Update the user
        userRepresentation.setEmail(email);
        userRepresentation.setUsername(email);

        realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
    }

    public AccessTokenResponse login(String username, String password) throws Exception {
        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(this.serverUrl)
                .realm(this.realm)
                .username(username)
                .password(password)
                .clientId(this.clientId)
                .grantType(OAuth2Constants.PASSWORD)
                .build();

        return keycloak.tokenManager().getAccessToken();
    }

    public boolean checkOldPassword(String username, String oldPassword) {
        try {
            AccessTokenResponse tokenResponse = login(username, oldPassword);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public void changePassword(String username, String password) throws Exception {
        // Get the realm
        RealmResource realmResource = keycloak.realm(realm);

        // Get the user
        UserRepresentation userRepresentation = realmResource.users().search(username).get(0);

        // Define user credentials
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);

        // Update the user
        userRepresentation.setCredentials(Arrays.asList(passwordCred));
        realmResource.users().get(userRepresentation.getId()).update(userRepresentation);
    }

    public void forgotPassword(String username) throws Exception {
        RealmResource realmResource = keycloak.realm(realm);

        UserRepresentation userRepresentation = realmResource.users().search(username).get(0);

        realmResource.users().get(userRepresentation.getId()).executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
    }


}
