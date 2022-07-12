import {
  BbsBlsSignatureProof2020,
  deriveProof,
} from "@mattrglobal/jsonld-signatures-bbs";

import { document_loader, get_purpose} from "./utilities.js";

export async function derive_proof(request_data) {

  var signedDocument = request_data.signed_doc
  var revealDocument = request_data.reveal_doc

  return await deriveProof(signedDocument, revealDocument, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader: document_loader
  })
}