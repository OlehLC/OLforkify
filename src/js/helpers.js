import { async } from 'regenerator-runtime';
import  {TIMEOUT_SEC} from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function(url , uploadata=undefined){
  try{
const fetchPro=uploadata ?  fetch(url, {     method: 'POST',
headers: {
  'Content-Type':'application/json'
},
body: JSON.stringify(uploadata),
}) : fetch(url);
const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]); 
const data= await res.json();


  if(!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
    } catch(err){
throw err;
    }
};
/*
export  const getJSON= async function(url){
    try{
      const fetchPro=fetch(url);
const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]); 
const data= await res.json();


  if(!res.ok) throw new Error(`${data.message} (${res.status})`); 
  return data;
    } catch(err){
throw err;
    }
};
export  const sentJSON= async function(url , uploadata){
  try{
    const fetchPro= fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(uploadata),
    });
const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]); 
const data= await res.json();


if(!res.ok) throw new Error(`${data.message} (${res.status})`); 
return data;
  } catch(err){
throw err;
  }
};*/