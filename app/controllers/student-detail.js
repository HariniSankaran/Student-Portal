import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        async updateStudent(){

            let requestBody = {
                students: {
                    image: document.getElementById('image').value,
                    year: document.getElementById('year').value,
                    name: document.getElementById('name').value,
                    domain: document.getElementById('domain').value
                }
            };

            window.alert("Do you wish to update the student detail");

            let response = await fetch(`/api/updatestudent/${this.model.data.id}`, {
                method: 'PUT',
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
