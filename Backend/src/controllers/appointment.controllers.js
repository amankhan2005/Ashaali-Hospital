 import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctors.models.js";

// Get appointments or booked slots for doctor & date
export const getAppointments = async (req,res)=>{
  try{
    const {doctorId,date} = req.query;
    if(doctorId && date){
      const booked = await Appointment.find({doctorId,date:new Date(date)});
      const bookedSlots = booked.map(a=>a.time);
      return res.json({bookedSlots});
    }
    const all = await Appointment.find().populate("doctorId");
    res.json(all);
  } catch(e){ res.status(500).json({error:e.message}); }
};

// Book appointment
export const bookAppointment = async (req,res)=>{
  try{
    const {doctorId,date,time} = req.body;
    const exists = await Appointment.findOne({doctorId,date:new Date(date),time});
    if(exists) return res.status(400).json({error:"Slot booked"});
    const app = new Appointment(req.body);
    await app.save();
    res.status(201).json(app);
  } catch(e){ res.status(400).json({error:e.message}); }
};

// Update appointment status
export const updateAppointment = async (req,res)=>{
  try{
    const app = await Appointment.findByIdAndUpdate(req.params.id, req.body,{new:true});
    if(!app) return res.status(404).json({message:"Not found"});
    res.json(app);
  } catch(e){ res.status(400).json({error:e.message}); }
};

// Delete appointment
export const deleteAppointment = async (req,res)=>{
  try{
    const app = await Appointment.findByIdAndDelete(req.params.id);
    if(!app) return res.status(404).json({message:"Not found"});
    res.json({message:"Appointment deleted"});
  } catch(e){ res.status(500).json({error:e.message}); }
};
