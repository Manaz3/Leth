import { CertificateData } from "./type/CertificateData";
import { Certificate } from "./type/Certificate";

export async function apiCertificate(
  certificate: CertificateData
): Promise<Certificate> {
  const res = await fetch("/api/certificate", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(certificate),
  });
  console.log("3", res);

  return res.json();
}
