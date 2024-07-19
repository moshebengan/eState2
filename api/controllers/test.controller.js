import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async (req, res) => {
    res.status(200).json({message:'You are Authenticated'})
    console.log(req.userId)
   
}


export const shouldBeAdmin = async (req, res) => {
      if (!req.isAdmin) {
        return res.status(403).json({ message: "Not authorized!" });
      }
  
    res.status(200).json({ message: "You are Authenticated" });   
  };