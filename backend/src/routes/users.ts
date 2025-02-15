import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  const results = req.query.results || 10;
  const page = req.query.page || 1;

  try {
    const response = await axios.get('https://randomuser.me/api', {
      params: { results, page }
    });
    
    const manipulatedData = response.data.results.map((user: any) => {
      const name = `${user.name.title}, ${user.name.first} ${user.name.last}`;
      const location = `${user.location.street.number},${user.location.street.name}, ${user.location.city},${user.location.state} , ${user.location.country}`;
      // Ambil age dari user.registered.age atau user.dob.age sesuai kebutuhan
      const age = user.registered.age;
      const email = user.email;
      const phone = user.phone;
      const cell = user.cell;
      const picture = [user.picture.large, user.picture.medium, user.picture.thumbnail];

      return { name, location, email, age, phone, cell, picture };
    });

    res.json(manipulatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default router;