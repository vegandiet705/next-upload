import {
  GetSignedUrlOptions,
  HandlerAction,
  NextUploadConfig,
  SignedPostPolicy,
} from './types';

export const getSignedUrl = async (
  options: GetSignedUrlOptions,
  config: NextUploadConfig
): Promise<SignedPostPolicy> => {
  const api = config.api || `/upload`;
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.requestInit?.headers,
    },
    body: JSON.stringify({
      action: HandlerAction.generatePresignedPostPolicy,
      args: options.args,
      ...options.requestInit?.body,
    }),
    ...options.requestInit,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
};
