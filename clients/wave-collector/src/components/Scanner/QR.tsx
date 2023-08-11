import React from "react";

// TODO: Polish styles to match designs
// TODO: Add QR code scanner
// TODO: Add Loader for scanning

interface QRScannerProps {
  isIdle: boolean;
  isScanning: boolean;
  detected?: boolean;
  error: string | null;
  onQRDetection: (code: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onQRDetection }) => {
  async function handleImage(file: File | null) {
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  }

  return (
    <div>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleUpload}
      />
      QRScanner
    </div>
  );
};
