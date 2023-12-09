
import { editPopupProps } from '../../Types';
import Button from '../Button/Button';

const EditPopup = ({cancelEdit, acceptEdit}: editPopupProps) => {
    return (
      <>
        <h2>Do you want to make changes ?</h2>
        <div className="delete-popup__button-wrapper">
          <Button
            type="primary"
            value="Cancel"
            buttonType="button"
            handleClick={cancelEdit}
          />
          <Button
            type="warning"
            value="Edit"
            buttonType="button"
            handleClick={acceptEdit}
          />
        </div>
      </>
    );
}

export default EditPopup