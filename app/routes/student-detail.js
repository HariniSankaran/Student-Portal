import Route from '@ember/routing/route';

export default Route.extend({
    async model(params){
        return await fetch(`/api/student/${params['student-id']}`).then(response=> response.json());
    },
});
