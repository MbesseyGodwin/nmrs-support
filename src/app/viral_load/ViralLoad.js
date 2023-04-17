import React from 'react';
import ViralLoadCards from './ViralLoadCards';
// import ViralLoadDataTable from './ViralLoadDataTable';
import ViralLoadDataTable from './ViralLoadDataTableClone';
import ComingSoon from '../shared/ComingSoon';

function ViralLoad() {
  return (
    <div>
      <ViralLoadCards />
      <ViralLoadDataTable />
      <ComingSoon />
    </div>


  )
}

export default ViralLoad