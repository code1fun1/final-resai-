import { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { AdditionalData, OnboardingData } from '../Utils/OnboardingUtils';
import PersonalDetailsForm from '~/shared/components/PersonalDetailsForm';

interface AdditionalDetailsProps {
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  additionalData: AdditionalData;
  onBack?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
}

// interface ContactInfo {
//   phone: string | null;
//   email: string | null;
//   isCompleted: boolean;
// }

const AdditionalDetails: FC<AdditionalDetailsProps> = ({
  onSave,
  additionalData,
  onBack,
  onCancel,
  onContinue
}) => {
  return (
    <PersonalDetailsForm
      onSave={onSave}
      additionalData={additionalData}
      onBack={onBack}
      onCancel={onCancel}
      onContinue={onContinue}
    />
  );
};

export default AdditionalDetails;
