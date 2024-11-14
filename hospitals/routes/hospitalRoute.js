
const express=require('express')
const router=express.Router()

// for file handling-fs module

const fs=require('fs')

// reading-json file

const loadHospitaldata=()=>{
    try {
        
          const dataBuffer=fs.readFileSync('hospitaldata.json')
          const dataJSON=dataBuffer.toString()
          return JSON.parse(dataJSON)

        } catch (error) {
        
        console.log(error)
        return []
    }
}

// write

const saveHospitaldatas=(hospitaldata)=>{

    try{
    const dataJSON=JSON.stringify(hospitaldata,null,2)
    fs.writeFileSync('hospitaldata.json',dataJSON)
    }catch(error){
        console.log(error)
    }
}

router.get('/',(req,res)=>{
    
    const hospitaldata=loadHospitaldata()
    res.send(hospitaldata)

})
   

// get-by single id

router.get('/:id', (req, res) => {
    const hospitalData = loadHospitaldata();
    
  
    const id = parseInt(req.params.id);

  
    const hospital = hospitalData.find(h => h.id === id);

    if (hospital) {
        res.send(hospital);
    } else {
        res.status(404).send({ error: `Hospital with ID ${id} not found` });
    }
});





// post method

router.post('/',(req,res)=>{
    try{
    const hospitaldata=loadHospitaldata()
    const newHospital={
        id:hospitaldata.length +1,
        hospitalName:req.body.hospitalName,
        patientCount:req.body.patientCount,
        location:req.body.location ||[]

    }

    hospitaldata.push(newHospital)
    saveHospitaldatas(hospitaldata)
    res.status(201).send(newHospital)
}catch(error){
    res.status(400).send({error})
}
})


// update by id

router.patch('/:id',(req,res)=>{

    try {
        
             const hospitaldata=loadHospitaldata()
             const hospitals=hospitaldata.find(i=>i.id === parseInt(req.params.id))
             if(!hospitals){
                return res.status(404).send({error:'hospital not found'})
             }

             hospitals.id=req.body.id || hospitals.id
             hospitals.hospitalName=req.body.hospitalName || hospitals.hospitalName
             hospitals.patientCount=req.body.patientCount|| hospitals.patientCount
             hospitals.location=req.body.location || hospitals.location

             saveHospitaldatas(hospitaldata)
             res.status(200).send(hospitals)
    
            } catch (error) {

                res.status(400).send({error})

            }
})

// delete by id 

router.delete('/:id',(req,res)=>{
    try {
        
        let  hospitaldata=loadHospitaldata()
        const index=hospitaldata.findIndex(i=>i.id===parseInt(req.params.id))
      if(index=== -1){
        return res.status(404).send({error:'hospital not found'})

      }
         hospitaldata.splice(index,1)
         saveHospitaldatas(hospitaldata)
         res.send({message:'hospital deleted'})

    } catch (error) {
        res.status(400).send({error})

        
    }
})




module.exports=router;