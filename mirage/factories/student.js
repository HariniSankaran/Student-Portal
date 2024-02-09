import { Factory } from 'miragejs';

export default Factory.extend({
    domain() {
        const domains = ["Civil", "Mech", "ECE", "EEE","CSE","IT","MBA","BT","AIML","MCA"];
        const randomNumber = Math.random();
        const scaledNumber = Math.floor(randomNumber * 9) + 1;
        
        if(scaledNumber>=0 && scaledNumber < domains.length){
            return domains[scaledNumber]
        }
        else{
            return null;
        }
    },

    name(){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomString = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    },

    year() {
        let min = 2006;
        let max = 2023;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    image(){
        const images = ["https://fastly.picsum.photos/id/85/1280/774.jpg?hmac=h_HHpvfhMmLP6uOSrHS7HSlXVRuMKfBbc8HFKd1Acv4", 
        "https://fastly.picsum.photos/id/35/2758/3622.jpg?hmac=xIB3RTEGJ59FEnaQOXoaDgwX_K6PHAg57R0b4t7tiX0",
        "https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o", 
        "https://fastly.picsum.photos/id/34/3872/2592.jpg?hmac=4o5QGDd7eVRX8_ISsc5ZzGrHsFYDoanmcsz7kyu8A9A",
        "https://fastly.picsum.photos/id/92/3568/2368.jpg?hmac=k-61p7oMQe6U59dEgm0Gu6bWTJGPfHblWxMskxTBZMo",
        "https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4"];
        
        return images[Math.floor(Math.random() * 6)];
    }

});
