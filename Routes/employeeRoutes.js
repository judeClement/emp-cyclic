const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Load Employee model
const Employee = require('../Model/postEmployee');
router.use(express.json());

function verifyToken(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) throw 'unauthorized access';
    let payload = jwt.verify(token, 'secretkey');
    if (!payload) throw 'unauthorized access';
    next();
  } catch (error) {
    res.status(404).send('caught in error');
  }
}

function allowAccessWithoutToken(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    next(); // No token provided, proceed to the next middleware
  } else {
    // Token provided, proceed to verify it
    verifyToken(req, res, next);
  }
}

// GET route to fetch all employees
router.get('/employee', allowAccessWithoutToken, (req, res) => {
  Employee.find()
    .then(employees => {
      res.status(200).json(employees);
    })
    .catch(err => {
      console.error('Error fetching employees:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// GET route to fetch a specific employee
router.get('/employee/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  Employee.findById(id)
    .then(employee => {
      res.status(200).json(employee);
    })
    .catch(err => {
      console.error('Error fetching employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// PUT route to update an existing employee
router.put('/employee/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    place: req.body.place,
    designation: req.body.designation,
    salary: req.body.salary
  }, { new: true })
    .then(employee => {
      res.status(200).json(employee);
    })
    .catch(err => {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// POST route to create a new employee
router.post('/addemployee', verifyToken, (req, res) => {
  const newEmployee = new Employee(req.body);

  newEmployee.save()
    .then(employee => {
      res.status(201).json(employee);
    })
    .catch(err => {
      console.error('Error creating employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// DELETE route to delete an existing employee
router.delete('/:id', verifyToken, (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;





//////////////////////////


// const express = require('express');
// const router = express.Router();
// const jwt=require('jsonwebtoken')
// // Load Employee model
// const Employee = require('../Model/postEmployee');
// router.use(express.json())


// function verifytoken(req,res,next) {
// try {
//   const token=req.headers.token;
//   if(!token) throw 'unauthorized access'
//   let payload=jwt.verify(token,'secretkey')
//   if(!payload) throw 'unauthorized access'
//   next()
// } catch (error) {
//   res.status(404).send('caught in error')
// }
// }

// function allowAccessWithoutToken(req, res, next) {
//   const token = req.headers.token;
//   if (!token) {
//     next(); // No token provided, proceed to the next middleware
//   } else {
//     // Token provided, proceed to verify it
//     verifyToken(req, res, next);
//   }
// }

// // GET route to fetch all employees
// router.get('/employee', allowAccessWithoutToken, (req, res) => {
//   Employee.find()
//     .then(employees => {
//       res.status(200).json(employees);
//     })
//     .catch(err => {
//       console.error('Error fetching employees:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });


// // GET route to fetch all employees
// router.get('/employee',verifytoken, (req, res) => {
//   Employee.find()
//     .then(employees => {
//       res.status(200).json(employees);
//     })
//     .catch(err => {
//       console.error('Error fetching employees:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });



// router.get('/employee/:id',verifytoken,  (req, res) => {
//   const id = req.params.id;
//   Employee.findById(id)
//     .then(employee => {
//       res.status(200).json(employee);
//     })
//     .catch(err => {
//       console.error('Error fetching employee:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// // PUT route to update an existing employee
// router.put('/employee/:id',verifytoken,  (req, res) => {
//   const id=req.params.id
//   Employee.findByIdAndUpdate({_id:id}, {
//     name:req.body.name ,
//     place:req.body.place, 
//     designation:req.body.designation, 
//     salary:req.body.salary}, { new: true })   
//     .then(employee => {
//       res.status(200).json(employee);
//     })
//     .catch(err => {
//       console.error('Error updating employee:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// //

// // POST route to create a new employee
// router.post('/addemployee',verifytoken,  (req, res) => {
//   const newEmployee = new Employee(req.body);

//   newEmployee.save()
//     .then(employee => {
//       res.status(201).json(employee);
//     })
//     .catch(err => {
//       console.error('Error creating employee:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });



// // DELETE route to delete an existing employee
// router.delete('/:id', verifytoken, (req, res) => {
//   Employee.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch(err => {
//       console.error('Error deleting employee:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// module.exports = router;


