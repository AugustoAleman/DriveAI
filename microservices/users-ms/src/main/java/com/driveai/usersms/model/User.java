package com.driveai.usersms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
//    Enum value user_type with options admin, driver, passenger
    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserType user_type;

    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    private Date updatedAt;
    @Nullable
    private Date deletedAt;
    @NotNull(message = "Name cannot be null/empty")
    private String name;
    @NotNull(message = "Surname cannot be null/empty")
    private String surname;
    @Email(message = "Please enter a valid email")
    private String email;
    @Size(min = 10, max = 10, message = "Cellphone must be 10 digits")
    private String cellphone;
    private String telephone;
    private boolean is_deleted;
    @Past(message = "Date of birth cannot be in the future")
    private Date dateOfBirth;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_dealership",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "dealership_id"))
    private List<Dealership> dealerships = new ArrayList<>();

    @JsonIgnore
    @Column(name = "profile_picture_url")
    @Nullable
    private String profilePictureUrl;

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public List<Dealership> getDealerships() {
        return dealerships;
    }

    public void setDealerships(List<Dealership> dealerships) {
        this.dealerships = dealerships;
	}

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Date getDeletedAt() {
        return deletedAt;
    }
    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }
    public String getName() { return name; }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCellphone() {
        return cellphone;
    }
    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    public Date getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(Date date_of_birth) {
        this.dateOfBirth = date_of_birth;
    }
    public UserType getUser_type() {
        return user_type;
    }
    public void setUser_type(UserType user_type) {
        this.user_type = user_type;
    }

    public String updateToString() {
        return "User{" +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", cellphone='" + cellphone + '\'' +
                ", telephone='" + telephone + '\'' +
                '}';
    }
}
