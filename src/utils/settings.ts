export const environment = process.env.NODE_ENV;
export const deploymentHash = process.env.VUE_APP_DEPLOYMENT_HASH;

export const apis = {
  model: `${process.env.VUE_APP_MODEL_API}`,
  modelStorage: `${process.env.VUE_APP_MODEL_STORAGE_API}`,
  warehouse: `${process.env.VUE_APP_WAREHOUSE_API}`,
  maps: `${process.env.VUE_APP_MAPS_API}`,
  iam: `${process.env.VUE_APP_IAM_API}`,
  metabolicNinja: `${process.env.VUE_APP_METABOLIC_NINJA_API}`,
  designStorage: `${process.env.VUE_APP_DESIGN_STORAGE_API}`,
  idMapper: `${process.env.VUE_APP_ID_MAPPER_API}`,
  bigg: `${process.env.VUE_APP_BIGG_API}`
};

export const trustedURLs = process.env.VUE_APP_TRUSTED_URLS.split(",");
export const sentryDSN = process.env.sentryDSN;
