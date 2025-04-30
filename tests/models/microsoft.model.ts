export interface MicrosoftCompany {
  id: string;
  systemVersion: string;
  timestamp: number;
  name: string;
  displayName: string;
  businessProfileId: string;
  systemCreatedAt: string;
  systemCreatedBy: string;
  systemModifiedAt: string;
  systemModifiedBy: string;
}

export interface MicrosoftExtension {
  "@odata.etag": string;
  packageId: string;
  id: string;
  displayName: string;
  publisher: string;
  versionMajor: number;
  versionMinor: number;
  versionBuild: number;
  versionRevision: number;
  isInstalled: boolean;
  publishedAs: string;
}
