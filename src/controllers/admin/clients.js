const clientModel = require("../../model/clients");

//Get Client
exports.getClients = async (req, res) => {
  try {
    const getAllClients = await clientModel.find().sort({ createdAt: -1 });
    res.status(200).json(getAllClients);
  } catch (error) {
    console.log("error in get Clients --", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// Add Client
exports.addClients = async (req, res) => {
  try {
    const new_image = req.file ? req.file.filename : null;

    const client = new clientModel({
      image: new_image,
    });

    await client.save();

    return res.status(201).json({
      message: "Added successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in addClients --", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// Update Client
exports.updateClients = async (req, res) => {
  try {
    const { id } = req.params;
    const update_image = req.file ? req.file.filename : null;

    // Prepare update object
    const updateData = {};
    if (update_image) {
      updateData.image = update_image;
    }

    const updateClient = await clientModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateClient) {
      return res.status(404).json({
        message: "Client not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Updated successfully",
      success: true,
      data: updateClient,
    });
  } catch (error) {
    console.log("error in updateClients --", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// Delete Client
exports.deleteClients = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteClient = await clientModel.findByIdAndDelete(id);

    if (!deleteClient) {
      return res.status(404).json({
        message: "Client not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Delete successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in delete Clients --", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
