import Route from '@ember/routing/route';

export default Route.extend({
    async model(){
        return await fetch('/api/student').then(response=> response.json());
    },
});
