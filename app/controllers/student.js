import Controller from '@ember/controller';

export default Controller.extend({
    isSidebarOpen : false,
    selectedStudent : null,

    actions: {
        openSidebar(student) {
            this.set('isSidebarOpen', true);
            this.set('selectedStudent', student);
            console.log("adasd",  this.selectedStudent);
        },
        
        closeSidebar() {
            this.set('isSidebarOpen', false);
        },

        async deleteStudent(){

            window.alert("Are you sure to delete the student detail");

            const response = await fetch(`/api/deletestudent/${this.selectedStudent.id}`, {
                method: 'DELETE'
            });


            this.set('isSidebarOpen', false);
    
            this.transitionToRoute('student');
            window.location.reload();
            return response;

        },
    
    },
});
