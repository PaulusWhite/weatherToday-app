//Icons
import errorIcon from "../assets/icons/error.svg";

const Error = (props: {errorCode: number}) => {
    let errorCode: number = props.errorCode;
    let errorMessage = "The region was not found. Please, check your request spelling or rephrase one"; //by Default
    errorCode !== 1006 && (errorMessage = "Some error happened. Please, try again in some time");
  return (
    <div className="error">
        <img src={errorIcon} alt="errorIcon"/>
        <p className="errorMessage">{errorMessage}</p>
    </div>
  )
}

export default Error;