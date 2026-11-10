import { AUTH_CONFIG } from "../../config/auth.config.js";
import { NotFoundError } from "../../errors/Http.error.js";
import { setCookie } from "../../utils/cookie.js";
import { parseExpiresToSeconds } from "../../utils/token.utils.js";

import {
  createProvider as createProviderService,
  getAllProviders as getAllProvidersService,
  getProviderById as getProviderByIdService,
  updateProvider as updateProviderService,
  deleteProvider as deleteProviderService,
  bulkDeleteProviders as bulkDeleteProvidersService,
  updateProviderByUser as updateProviderByUserService
} from "./providers.service.js";


export const createProvider = async (req, res) => {
  const payload = req.validated?.body;
  const {
    provider,
    user,
    refreshToken,
    accessToken
  } = await createProviderService({
    ...payload,
    user: req.user
  });

  const refreshTtlSeconds = parseExpiresToSeconds(
    AUTH_CONFIG.REFRESH_TOKEN.EXPIRY
  );

  setCookie(
    res,
    AUTH_CONFIG.REFRESH_TOKEN.COOKIE_NAME,
    refreshToken,
    refreshTtlSeconds
  );

  const accessTtlSeconds = parseExpiresToSeconds(
    AUTH_CONFIG.ACCESS_TOKEN.EXPIRY
  );

  setCookie(
    res,
    AUTH_CONFIG.ACCESS_TOKEN.COOKIE_NAME,
    accessToken,
    accessTtlSeconds
  );

  return res.status(201).json({
    success: true,
    data: {
      provider,
      user
    }
  });
};

export const getAllProviders = async (req, res) => {
  const filters = req.validated?.query || {};
  const providers = await getAllProvidersService(filters);

  return res.status(200).json(
    { 
      success:true,
      data:{
        providers 
      }
    })
};

export const getProviderById = async (req, res) => {
  const { id } = req.validated?.params;

  const provider = await getProviderByIdService(id);
  console.log(provider);

  if (!provider) {
    throw new NotFoundError("provider not found");
  }

  return res.status(200).json({ 
    success:true, 
    data:{
      provider 
    }
  });
};


export const getProviderByUser = async (req, res) => {
  const provider = await getProviderByIdService(req?.user?.provider);
  if (!provider) {
    throw new NotFoundError("provider not found");
  }

  return res.status(200).json({ 
    success:true, 
    data:{
      provider 
    }
  });
};

export const updateProvider = async (req, res) => {
  const { id } = req.validated?.params;
  const updates = req.validated?.body;

  const updatedProvider = await updateProviderService(
    id,
    updates,
    req.user?.id || null
  );

  return res.status(200).json({ 
    success: true,
    data: { 
      provider: updatedProvider 
    }});
};

export const updateProviderByUser = async (req, res) => {
  const updates = req.validated?.body;
  const updatedProvider = await updateProviderByUserService(
    updates,
    req.user?.id || null
  );

  return res.status(200).json({ provider: updatedProvider });
};


export const deleteProvider = async (req, res) => {
  const { refreshToken, accessToken,user } = await deleteProviderService(req.user);
  const refreshTtlSeconds = parseExpiresToSeconds(
    AUTH_CONFIG.REFRESH_TOKEN.EXPIRY
  );

  setCookie(
    res,
    AUTH_CONFIG.REFRESH_TOKEN.COOKIE_NAME,
    refreshToken,
    refreshTtlSeconds
  );

  const accessTtlSeconds = parseExpiresToSeconds(
    AUTH_CONFIG.ACCESS_TOKEN.EXPIRY
  );

  setCookie(
    res,
    AUTH_CONFIG.ACCESS_TOKEN.COOKIE_NAME,
    accessToken,
    accessTtlSeconds
  );

  return res.status(200).json({
    success:true,
    data:{
      user
    }
  });
};

export const deleteProviderAdmin = async (req, res) => {
  const id = req.validated?.params?.id;
  const response = await deleteProviderAdminService(id);

  return res.status(200).json({
    success:true,
    data:response
  });
};

export const bulkDeleteProviders = async (req, res) => {
  const { ids } = req.validated?.body;

  if (!ids?.length) {
    return res.status(400).json({ error: "No provider IDs provided" });
  }

  await bulkDeleteProvidersService(ids, req.user?.id || null);

  return res.status(200).json({ message: "Bulk delete successful" });
};