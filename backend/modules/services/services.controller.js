import * as serviceService from "./services.service.js";

export const createService = async (req, res) => {
  const service = await serviceService.createService({
    ...req.validated?.body,
    user: req.user,
    files: req.media?.imageFiles,
    fileIds: req.validated.body.images,
    mediaContext:req.mediaContext
  });

  res.status(201).json({
    success: true,
    data: {service}
  });
};

export const getServices = async (req, res) => {
  const result = await serviceService.getServices(req.validated?.query);
  res.json({
    success: true,
    data: result
  });
};


export const getServicesByProvider = async (req, res) => {
  const services = await serviceService.getServicesByProvider(req.user.provider);

  res.json({
    success: true,
    data: {services}
  });
};

export const getByCategory = async (req, res) => {
  const services = await serviceService.getByCategory(
    req.validated?.params.categoryId
  );

  res.json({
    success: true,
    data: {services}
  });
};

export const getServiceById = async (req, res) => {
  const service = await serviceService.getServiceById(req.validated?.params?.id);

  res.json({
    success: true,
    data: { service }
  });
};


export const updateService = async (req, res) => {
  const service = await serviceService.updateService({
    serviceId: req.validated?.params.id,
    user: req.user,
    data: {
      ...req.validated?.body,
      files: req.media?.images || []
    },
    context:req.mediaContext?.images
  });

  res.json({
    success: true,
    data: {service}
  });
};

export const deleteService = async (req, res) => {
  await serviceService.deleteService({
    serviceId: req.validated?.params.id,
    user: req.user
  });

  res.status(204).send();
};