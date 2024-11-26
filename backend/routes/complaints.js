const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect, admin } = require('../middleware/auth');
const asyncHandler = require('express-async-handler');
const upload = require('../middleware/upload');
const { createComplaintSchema, updateComplaintSchema } = require('../validators/complaintValidator');

// Middleware validasi pembuatan pengaduan
const validateCreateComplaint = (req, res, next) => {
  const { error } = createComplaintSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware validasi pembaruan pengaduan
const validateUpdateComplaint = (req, res, next) => {
  const { error } = updateComplaintSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Route untuk membuat pengaduan baru
router.post(
  '/',
  protect,
  upload.single('documentation'),
  validateCreateComplaint,
  asyncHandler(async (req, res) => {
    const { title, description, companyName } = req.body;
    const documentation = req.file ? req.file.path : null;

    const complaint = new Complaint({
      user: req.user._id,
      title,
      description,
      companyName, // Menyimpan nama perusahaan
      documentation,
      status: 'pending', // Status default
    });

    await complaint.save();
    res.status(201).json(complaint);
  })
);

// @route   GET /api/complaints
// @desc    Get all complaints (admin) or user's complaints with optional filters and pagination
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    let filter = {};

    if (req.user.role !== 'admin') {
      filter.user = req.user._id;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: { path: 'user', select: 'name email' },
    };

    const complaints = await Complaint.paginate(filter, options);
    res.json(complaints);
  })
);

// Route untuk memperbarui pengaduan
router.put(
  '/:id',
  protect,
  admin,
  upload.single('documentation'),
  validateUpdateComplaint,
  asyncHandler(async (req, res) => {
    const { status, response } = req.body;
    const documentation = req.file ? req.file.path : null;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
    }

    complaint.status = status || complaint.status;
    complaint.response = response !== undefined ? response : complaint.response;
    complaint.documentation = documentation || complaint.documentation;

    await complaint.save();
    res.json(complaint);
  })
);

// Route untuk menghapus pengaduan
router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
    }

    await complaint.remove();
    res.json({ message: 'Pengaduan berhasil dihapus' });
  })
);

// @route   GET /api/complaints/data-pengadu
// @desc    Custom route to fetch complaint data with additional fields
router.get(
  '/data-pengadu',
  protect,
  asyncHandler(async (req, res) => {
    let filter = {};

    if (req.user.role !== 'admin') {
      filter.user = req.user._id;
    }

    // Ambil data dengan populate user
    const complaints = await Complaint.find(filter)
      .populate('user', 'name email nik noTelpon createdAt address gender');

    // Filter data agar unik berdasarkan user._id
    const uniqueComplaints = complaints.filter(
      (complaint, index, self) =>
        index === self.findIndex((c) => c.user?._id.toString() === complaint.user?._id.toString())
    );

    res.json(uniqueComplaints);
  })
);


// Rute untuk menambahkan pengaduan
router.post('/complaints', async (req, res) => {
  const { title, description, companyName } = req.body;

  try {
      const newComplaint = new Complaint({
          title,
          description,
          companyName, // Pastikan companyName disertakan
      });

      await newComplaint.save();
      res.status(201).json(newComplaint);
  } catch (error) {
      console.error('Error saving complaint:', error);
      res.status(500).json({ message: 'Error saving complaint' });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Complaint = require('../models/Complaint');
// const { protect, admin } = require('../middleware/auth');
// const asyncHandler = require('express-async-handler');
// const upload = require('../middleware/upload');
// const { createComplaintSchema, updateComplaintSchema } = require('../validators/complaintValidator');

// // Middleware validasi pembuatan pengaduan
// const validateCreateComplaint = (req, res, next) => {
//   const { error } = createComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // Middleware validasi pembaruan pengaduan
// const validateUpdateComplaint = (req, res, next) => {
//   const { error } = updateComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // Route untuk membuat pengaduan baru
// router.post(
//   '/',
//   protect,
//   upload.single('documentation'),
//   validateCreateComplaint,
//   asyncHandler(async (req, res) => {
//     const { title, description, companyName } = req.body;
//     const documentation = req.file ? req.file.path : null;

//     const complaint = new Complaint({
//       user: req.user._id,
//       title,
//       description,
//       companyName, // Menyimpan nama perusahaan
//       documentation,
//       status: 'pending', // Status default
//     });

//     await complaint.save();
//     res.status(201).json(complaint);
//   })
// );

// // @route   GET /api/complaints
// // @desc    Get all complaints (admin) or user's complaints with optional filters and pagination
// router.get(
//   '/',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const options = {
//       page,
//       limit,
//       sort: { createdAt: -1 },
//       populate: { path: 'user', select: 'name email' },
//     };

//     const complaints = await Complaint.paginate(filter, options);
//     res.json(complaints);
//   })
// );

// // Route untuk memperbarui pengaduan
// router.put(
//   '/:id',
//   protect,
//   admin,
//   upload.single('documentation'),
//   validateUpdateComplaint,
//   asyncHandler(async (req, res) => {
//     const { status, response } = req.body;
//     const documentation = req.file ? req.file.path : null;

//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
//     }

//     complaint.status = status || complaint.status;
//     complaint.response = response !== undefined ? response : complaint.response;
//     complaint.documentation = documentation || complaint.documentation;

//     await complaint.save();
//     res.json(complaint);
//   })
// );

// // Route untuk menghapus pengaduan
// router.delete(
//   '/:id',
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
//     }

//     await complaint.remove();
//     res.json({ message: 'Pengaduan berhasil dihapus' });
//   })
// );

// // @route   GET /api/complaints/data-pengadu
// // @desc    Custom route to fetch complaint data with additional fields
// router.get(
//   '/data-pengadu',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // // Memperbaiki populate untuk menyertakan nik, noTelpon, createdAt, companyName, address, gender dan documentation
//     // const complaints = await Complaint.find(filter)
//     //   .populate('user', 'name email nik noTelpon createdAt companyName address gender'); // Menyertakan data pengguna yang lebih lengkap
//     // res.json(complaints);
//     // Ambil langsung data companyName dari Complaint
//     const complaints = await Complaint.find(filter)
//       .populate('user', 'name email nik noTelpon createdAt address gender'); // Tanpa companyName di populate
//     res.json(complaints);
    
//   })
// );

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Complaint = require('../models/Complaint');
// const { protect, admin } = require('../middleware/auth');
// const asyncHandler = require('express-async-handler');
// const upload = require('../middleware/upload');
// const { createComplaintSchema, updateComplaintSchema } = require('../validators/complaintValidator');

// // Middleware validasi pembuatan pengaduan
// const validateCreateComplaint = (req, res, next) => {
//   const { error } = createComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // Middleware validasi pembaruan pengaduan
// const validateUpdateComplaint = (req, res, next) => {
//   const { error } = updateComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // Route untuk membuat pengaduan baru
// router.post(
//   '/',
//   protect,
//   upload.single('documentation'),
//   validateCreateComplaint,
//   asyncHandler(async (req, res) => {
//     const { title, description, companyName } = req.body;
//     const documentation = req.file ? req.file.path : null;

//     const complaint = new Complaint({
//       user: req.user._id,
//       title,
//       description,
//       companyName, // Menyimpan nama perusahaan
//       documentation,
//       status: 'pending', // Status default
//     });

//     await complaint.save();
//     res.status(201).json(complaint);
//   })
// );

// // // @route   GET /api/complaints
// // @desc    Get all complaints (admin) or user's complaints with optional filters and pagination
// router.get(
//   '/',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const options = {
//       page,
//       limit,
//       sort: { createdAt: -1 },
//       populate: { path: 'user', select: 'name email' },
//     };

//     const complaints = await Complaint.paginate(filter, options);
//     res.json(complaints);
//   })
// );

// // Route untuk memperbarui pengaduan
// router.put(
//   '/:id',
//   protect,
//   admin,
//   upload.single('documentation'),
//   validateUpdateComplaint,
//   asyncHandler(async (req, res) => {
//     const { status, response } = req.body;
//     const documentation = req.file ? req.file.path : null;

//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
//     }

//     complaint.status = status || complaint.status;
//     complaint.response = response !== undefined ? response : complaint.response;
//     complaint.documentation = documentation || complaint.documentation;

//     await complaint.save();
//     res.json(complaint);
//   })
// );

// // Route untuk menghapus pengaduan
// router.delete(
//   '/:id',
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
//     }

//     await complaint.remove();
//     res.json({ message: 'Pengaduan berhasil dihapus' });
//   })
// );

// // @route   GET /api/complaints/data-pengadu
// // @desc    Custom route to fetch complaint data (customize as needed)
// router.get(
//   '/data-pengadu',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // Memperbaiki populate untuk menyertakan nik, noTelpon, createdAt, companyName, address, gender dan documentation
//     const complaints = await Complaint.find(filter)
//       .populate('user', 'name email nik noTelpon createdAt companyName address gender'); // Menyertakan user data yang lebih lengkap
//     res.json(complaints);
//   })
// );

// module.exports = router;



// // backend/routes/complaintRoutes.js

// const express = require('express');
// const router = express.Router();
// const Complaint = require('../models/Complaint');
// const User = require('../models/User');
// const { protect, admin } = require('../middleware/auth');
// const asyncHandler = require('express-async-handler');
// const upload = require('../middleware/upload');  // Import multer
// const { createComplaintSchema, updateComplaintSchema } = require('../validators/complaintValidator');

// // Middleware untuk validasi pembuatan pengaduan
// const validateCreateComplaint = (req, res, next) => {
//   const { error } = createComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // Middleware untuk validasi pembaruan pengaduan
// const validateUpdateComplaint = (req, res, next) => {
//   const { error } = updateComplaintSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

// // @route   POST /api/complaints
// // @desc    Create a new complaint
// router.post(
//   '/',
//   protect,
//   upload.single('documentation'),  // Menggunakan multer untuk upload satu file
//   validateCreateComplaint,
//   asyncHandler(async (req, res) => {
//     const { title, description, companyName } = req.body;
//     const documentation = req.file ? req.file.path : null;  // Mengambil file path jika ada

//     // Validasi title dan description
//     if (!title || !description) {
//       return res.status(400).json({ message: '"title" and "description" are required' });
//     }

//     // Membuat pengaduan baru
//     const complaint = new Complaint({
//       user: req.user._id,
//       title,
//       description,
//       companyName,
//       documentation,  // Menyertakan dokumentasi jika ada
//       status: 'pending', // Status default
//     });

//     await complaint.save();
//     res.status(201).json(complaint);
//   })
// );

// // @route   GET /api/complaints
// // @desc    Get all complaints (admin) or user's complaints with optional filters and pagination
// router.get(
//   '/',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const options = {
//       page,
//       limit,
//       sort: { createdAt: -1 },
//       populate: { path: 'user', select: 'name email' },
//     };

//     const complaints = await Complaint.paginate(filter, options);
//     res.json(complaints);
//   })
// );

// // @route   PUT /api/complaints/:id
// // @desc    Update complaint status and response (admin)
// router.put(
//   '/:id',
//   protect,
//   admin,
//   upload.single('documentation'),  // Menggunakan multer untuk upload file saat update
//   validateUpdateComplaint,
//   asyncHandler(async (req, res) => {
//     const { status, response, companyName } = req.body;
//     const documentation = req.file ? req.file.path : null;  // Mengambil file baru jika ada

//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Complaint not found' });
//     }

//     if (status) {
//       complaint.status = status;
//     }
//     if (response !== undefined) {
//       complaint.response = response;
//     }

//     if (companyName) {
//       complaint.companyName = companyName;
//     }
//     if (documentation) {
//       complaint.documentation = documentation;  // Update dokumentasi jika ada file baru
//     }

//     await complaint.save();
//     res.json(complaint);
//   })
// );

// // @route   DELETE /api/complaints/:id
// // @desc    Delete a complaint (admin)
// router.delete(
//   '/:id',
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) {
//       return res.status(404).json({ message: 'Complaint not found' });
//     }

//     await complaint.remove();
//     res.json({ message: 'Complaint removed' });
//   })
// );

// // @route   GET /api/complaints/data-pengadu
// // @desc    Custom route to fetch complaint data (customize as needed)
// router.get(
//   '/data-pengadu',
//   protect,
//   asyncHandler(async (req, res) => {
//     let filter = {};

//     if (req.user.role !== 'admin') {
//       filter.user = req.user._id;
//     }

//     // Memperbaiki populate untuk menyertakan nik, noTelpon, createdAt, companyName, dan documentation
//     const complaints = await Complaint.find(filter)
//       .populate('user', 'name email nik noTelpon createdAt'); // Menyertakan user data
//     // Menyertakan companyName dan documentation dalam response jika diperlukan
//     res.json(complaints);
//   })
// );

// module.exports = router;

      
     


// // const express = require('express');
// // const router = express.Router();
// // const Complaint = require('../models/Complaint');
// // const User = require('../models/User');
// // const { protect, admin } = require('../middleware/auth');
// // const asyncHandler = require('express-async-handler');
// // const { createComplaintSchema, updateComplaintSchema } = require('../validators/complaintValidator');

// // // Middleware untuk validasi pembuatan pengaduan
// // const validateCreateComplaint = (req, res, next) => {
// //   const { error } = createComplaintSchema.validate(req.body);
// //   if (error) {
// //     return res.status(400).json({ message: error.details[0].message });
// //   }
// //   next();
// // };

// // // Middleware untuk validasi pembaruan pengaduan
// // const validateUpdateComplaint = (req, res, next) => {
// //   const { error } = updateComplaintSchema.validate(req.body);
// //   if (error) {
// //     return res.status(400).json({ message: error.details[0].message });
// //   }
// //   next();
// // };

// // // @route   POST /api/complaints
// // // @desc    Create a new complaint
// // router.post(
// //   '/',
// //   protect,
// //   validateCreateComplaint, // Pastikan validasi tetap diterapkan
// //   asyncHandler(async (req, res) => {
// //     const { title, description, companyName, documentation } = req.body;
    
// //     // Membuat pengaduan baru dengan nama perusahaan dan dokumentasi
// //     const complaint = new Complaint({
// //       user: req.user._id,
// //       title,
// //       description,
// //       companyName, // Tambahkan companyName
// //       documentation, // Tambahkan documentation
// //       status: 'pending', // Status default
// //     });

// //     await complaint.save();
// //     res.status(201).json(complaint);
// //   })
// // );


// // // @route   GET /api/complaints
// // // @desc    Get all complaints (admin) or user's complaints with optional filters and pagination
// // router.get(
// //   '/',
// //   protect,
// //   asyncHandler(async (req, res) => {
// //     let filter = {};

// //     if (req.user.role !== 'admin') {
// //       filter.user = req.user._id;
// //     }

// //     // Pagination
// //     const page = parseInt(req.query.page, 10) || 1;
// //     const limit = parseInt(req.query.limit, 10) || 10;
// //     const options = {
// //       page,
// //       limit,
// //       sort: { createdAt: -1 },
// //       populate: { path: 'user', select: 'name email' },
// //     };

// //     const complaints = await Complaint.paginate(filter, options);
// //     res.json(complaints);
// //   })
// // );


// // // @route   PUT /api/complaints/:id
// // // @desc    Update complaint status and response (admin)
// // router.put(
// //   '/:id',
// //   protect,
// //   admin,
// //   validateUpdateComplaint,
// //   asyncHandler(async (req, res) => {
// //     const { status, response } = req.body;
// //     const complaint = await Complaint.findById(req.params.id);
// //     if (!complaint) {
// //       return res.status(404).json({ message: 'Complaint not found' });
// //     }

// //     if (status) {
// //       complaint.status = status;
// //     }
// //     if (response !== undefined) {
// //       complaint.response = response;
// //     }

// //     await complaint.save();
// //     res.json(complaint);
// //   })
// // );

// // // @route   DELETE /api/complaints/:id
// // // @desc    Delete a complaint (admin)
// // router.delete(
// //   '/:id',
// //   protect,
// //   admin,
// //   asyncHandler(async (req, res) => {
// //     const complaint = await Complaint.findById(req.params.id);
// //     if (!complaint) {
// //       return res.status(404).json({ message: 'Complaint not found' });
// //     }

// //     await complaint.remove();
// //     res.json({ message: 'Complaint removed' });
// //   })
// // );

// // // @route   GET /api/complaints/data-pengadu
// // // @desc    Custom route to fetch complaint data (customize as needed)
// // router.get(
// //   '/data-pengadu',
// //   protect,
// //   asyncHandler(async (req, res) => {
// //     let filter = {};

// //     if (req.user.role !== 'admin') {
// //       filter.user = req.user._id;
// //     }

// //     // Memperbaiki populate untuk menyertakan nik, noTelpon, dan createdAt
// //     const complaints = await Complaint.find(filter)
// //       .populate('user', 'name email nik noTelpon createdAt'); // tambahkan field yang diperlukan

// //     res.json(complaints);
// //   })
// // );


// // module.exports = router;
