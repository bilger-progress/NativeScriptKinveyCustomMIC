import { Component, OnInit } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // Initialize Kinvey.
        Kinvey.init({
            "appKey": "xxx",
            "appSecret": "xxx",
            "instanceId": "xxx"
        });
        // Ping backend.
        Kinvey.ping()
            .then((response) => {
                console.log(`Kinvey Ping Success. Kinvey Service is alive, version: ${response.version}, response: ${response.kinvey}`);
                this.login();
            })
            .catch((error) => {
                console.log(`Kinvey Ping Failed. Response: ${JSON.stringify(error)}`);
            });
    }

    // Handle login.
    login() {
        if (Kinvey.User.getActiveUser() == null) {
            Kinvey.User.loginWithMIC(
                'myscheme://',
                Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage,
                { micId: 'xxx' }
            )
                .then((user: Kinvey.User) => {
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Kinvey.BaseError) => {
                    alert("An error occurred. Check your Kinvey settings.");
                    console.log("error: " + error);
                });
        } else {
            console.log(JSON.stringify(Kinvey.User.getActiveUser()));
        }
    }
}
