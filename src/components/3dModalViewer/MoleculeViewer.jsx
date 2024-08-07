// src/MoleculeViewer.js
import React, { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";
import style from "./MoleculeViewer.module.css";

const MoleculeViewer = ({ aminoAcidPdb }) => {
  const viewerRef = useRef(null);
  // screenshot the 3d model 
  useEffect(() => {
    if (viewerRef.current) {
      const element = viewerRef.current;
      const config = { backgroundColor: "gray" };
      const viewer = $3Dmol.createViewer(element, config);
      viewer.addModel(aminoAcidPdb, "pdb"); 
      viewer.setStyle({}, { stick: {} });
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(1.5, 500);
      viewerRef.current.viewer = viewer;
    }
  }, [aminoAcidPdb]);
// take a screenshot of the 3d model
  const takeScreenshot = () => {
    const viewer = viewerRef.current.viewer;
    if (viewer) {
      const screenshot = viewer.pngURI();
      const link = document.createElement("a");
      link.href = screenshot;
      link.download = "3dmodel.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={"col-sm-12 "+style.card}>
      <div
        style={{ width: `100%`, height: `100%` }}
        className="rounded-5 overflow-hidden top-0 end-0 start-0 bottom-0 position-absolute"
        ref={viewerRef}
      />
      <button onClick={takeScreenshot} className={style.btn}>
        Download Image
      </button>
    </div>
  );
};

export default MoleculeViewer;
