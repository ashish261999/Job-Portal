import { Company } from "../Models/companyModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    if (!name) {
      return res.status(401).json({
        message: "Something missing...",
        success: false,
      });
    }

    let company = await Company.findOne({ email });

    if (company) {
      return res.status(401).json({
        message: "Company already exist....",
        success: false,
      });
    }

    await Company.create({
      name,
      description,
      website,
      location,
      logo,
    });
    return res.status(201).json({
      message: "Company created sucessfully....",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found....",
        success: false,
      });
    }
    return res.status(201).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found....",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateConmay = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = {
      name,
      description,
      website,
      location,
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found....",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated...",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};
