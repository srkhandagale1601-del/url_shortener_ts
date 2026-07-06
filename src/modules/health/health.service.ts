export const getHealthService = async()=>{
   const isHealthy = true;
   if(isHealthy){
        return {
            status: "UP",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        };
   }
};