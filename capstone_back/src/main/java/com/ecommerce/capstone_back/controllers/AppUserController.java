package com.ecommerce.capstone_back.controllers;


import com.ecommerce.capstone_back.model.AppUser;
import com.ecommerce.capstone_back.repository.AppUserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.util.Optional;

@RestController
public class AppUserController {

//    testing



    @Autowired
    private final AppUserRepository appUserRepository;

    public AppUserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @GetMapping({"/users/id/{id}"})
    public Optional<AppUser> getUserById(@PathVariable Long id){
        return this.appUserRepository.findById(id);
   }

   @GetMapping({"/users/wallet/{id}/{wallet}"})
   public double getUserWallet(@PathVariable Long id, @PathVariable double wallet){
        AppUser user = appUserRepository.findById(id).get();
        return user.getWallet();
   }

//   get Wallet

   @PutMapping(
           value = {"/users/wallet/{wallet}"},
           produces = {"application/json"}
   )
    public AppUser updateWallet(@RequestBody AppUser user1, @PathVariable double wallet){
        return (AppUser) this.appUserRepository.save(user1);
   }

   @PatchMapping("/users/{id}/{firstName}")
    public ResponseEntity<AppUser> updateUserFirstName(@PathVariable Long id, @PathVariable String firstName){
        try{
            AppUser user =  appUserRepository.findById(id).get();
            user.setUserFirstName(firstName);
            return new ResponseEntity<AppUser>(appUserRepository.save(user), HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }

   @PatchMapping("/users/{id}/{lastName}")
    public ResponseEntity<AppUser> updateUserLastName(@PathVariable Long id, @PathVariable String lastName){
        try{
            AppUser user = appUserRepository.findById(id).get();
            user.setUserLastName(lastName);
            return new ResponseEntity<AppUser>(appUserRepository.save(user), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }

   @PatchMapping("/users/{id}/{address}")
    public ResponseEntity<AppUser> updateUserAddress(@PathVariable Long id, @PathVariable String address){
        try{
            AppUser user = appUserRepository.findById(id).get();
            user.setUserAddress(address);
            return new ResponseEntity<AppUser>(appUserRepository.save(user), HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }

   @PatchMapping("/users/{id}/{address}")
    public ResponseEntity<AppUser> updateUserPassword(@PathVariable Long id, @PathVariable String password){
        try{
            AppUser user = appUserRepository.findById(id).get();
            user.setUserPassword(password);
            return new ResponseEntity<AppUser>(appUserRepository.save(user), HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
   }

   @DeleteMapping("/users/delete/{id}/{delete}")
   public void deleteUser(@PathVariable Long id){
        this.appUserRepository.deleteById(id);

}


}
