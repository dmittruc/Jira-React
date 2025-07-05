import React, { useCallback, useRef } from 'react';

interface IProps {
  children: any;
  setFile: (file: File) => void;
}

const FilePicker = ({ children, setFile }: IProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chooseAvatar = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        setFile(file);
      }
    }
  };

  return (
    <div>
      <div onClick={chooseAvatar}>{children}</div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FilePicker;
