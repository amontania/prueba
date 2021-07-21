import React from 'react'
import publicIp from "public-ip";

 const GetClientIp = async () =>  await   publicIp.v4({
  fallbackUrls: [ "https://ifconfig.co/ip" ]
});

export default GetClientIp;

