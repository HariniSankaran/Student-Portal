import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async postStudent(){

            let requestBody = {
                students: {
                    image: document.getElementById('image').value,
                    year: document.getElementById('year').value,
                    name: document.getElementById('name').value,
                    domain: document.getElementById('domain').value
                }
            };

            window.alert("Do you wish to add the student detail");

            let response = await fetch('/api/addStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            this.transitionToRoute("student");

            return await response.json();
        },

    }
});
