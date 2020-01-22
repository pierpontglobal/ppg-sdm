import React from 'react';
import DocRow from './DocRow/DocRow';
import SortBar from '../SortBar/SortBar';
import BreakLine from '../BreakLine/BreakLine';
import FileUploader from './FileUploader/FileUploader';

function DocumentTable({ docs }) {
  return (
    <div className="d-flex flex-column">
      <SortBar
        header="January 19, 2017"
        className="mb-3"
      />
      <BreakLine opacity={0.12} />
      <DocRow
        header
        name="Name"
        date="Last Modified"
      />
      <BreakLine opacity={0.12} />
      <FileUploader />
      <BreakLine opacity={0.06} />
      {docs.map(doc => (
        <React.Fragment>
          <DocRow
            name={doc.name}
            date={doc.uploadedDate}
          />
          <BreakLine opacity={0.06} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default DocumentTable;
