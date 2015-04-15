/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.deviceInfo();
        console.log("CONSOLE LOG");
        //console.debug("CONSOLE DEBUG");
      
       // console.log(navigator.accelerometer);
        app.getAccelerometer();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    deviceInfo: function () {
        var infoDisplayed = document.createTextNode("cordova:" + device.cordova + " model:" + device.model + " platform:" + device.platform + " uuid:" + device.uuid + " version:" + device.version);

        $('#infoDevice').empty().append(infoDisplayed);


        console.log(device.cordova);
        //alert(device.cordova);
    },

    getAccelerometer: function () {
        //var options = { frequency: 600 };  // Update every X seconds
        var intervalID;
        intervalID = setInterval(app.watchAccelerometer, 150);
    },

    watchAccelerometer: function () {
        console.log("ERREUR ICI");
        navigator.accelerometer.getCurrentAcceleration(app.onSuccess, app.onError);
    },


    onSuccess: function (acceleration) {
        var accx, accy, accz,
            randX, randY, randZ;

        accx = Math.round(acceleration.x);
        accy = Math.round(acceleration.y);
        accz = Math.round(acceleration.z);


        $('#accx').empty().append(accx);
        $('#accy').empty().append(accy);
        $('#accz').empty().append(accz);

        function getRandomArbitrary() {
            return Math.floor(Math.random() * (20 - 1)) + 1;
        }

        randColor = Math.floor((accx * accy * accz) / 5);
        randColor2 = Math.floor((accx * accy * accz));
        randColor2 = randColor2 > 359 ? 359 : randColor2;
        //randY = accy * 11;
        //randZ = accz * 11;

        $('#infoDevice').empty().append(randColor + " et " + randColor2);

        $('body').css("background", "radial-gradient(hsl(" + randColor + ", 100% , 70%), hsl(" + randColor2 + ", 100% , 70%))");
    },

    onError: function () {
        //$('#infoDevice').empty().append();
        alert(navigator.accelerometer());
    }
        

       


};

app.initialize();