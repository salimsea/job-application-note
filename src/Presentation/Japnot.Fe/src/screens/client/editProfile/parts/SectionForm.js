import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextArea, TextInput } from "src/components/atoms";
import { actUserEditProfile, actUserInfo } from "src/redux/actions";

const SectionForm = () => {
  let history = useHistory();

  const dataInfoUser = useSelector((state) => state.userReducer.dataInfoUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (dataInfoUser) {
      setValue("username", dataInfoUser?.Username);
      setValue("email", dataInfoUser?.Email);
      setValue("firstName", dataInfoUser?.FirstName);
      setValue("middleName", dataInfoUser?.MiddleName);
      setValue("lastName", dataInfoUser?.LastName);
      setValue("summary", dataInfoUser?.Summary);
      setValue("linkCv", dataInfoUser?.LinkCv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInfoUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const btnSave = (data) => dispatch(actUserEditProfile(data));
  return (
    <div className="row clearfix">
      <div className="col-lg-8 col-md-8 mx-auto">
        <div className="card planned_task">
          <div className="header">
            <h2>Form Edit Profile</h2>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit(btnSave)}>
              <div className="row">
                <div className="col-md-12">
                  <TextInput
                    label={"Username"}
                    hook={register("username", { required: true })}
                    isError={errors.username}
                    disabled={true}
                  />
                  <TextInput
                    type="email"
                    label={"Email"}
                    hook={register("email", { required: true })}
                    isError={errors.email}
                  />
                  <div className="row">
                    <div className="col-md-4">
                      <TextInput
                        label={"First Name"}
                        hook={register("firstName", { required: true })}
                        isError={errors.firstName}
                      />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        label={"Middle Name"}
                        hook={register("middleName", { required: false })}
                        isError={errors.middleName}
                      />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        label={"Last Name"}
                        hook={register("lastName", { required: false })}
                        isError={errors.lastName}
                      />
                    </div>
                  </div>
                  <TextInput
                    label={"Link CV"}
                    hook={register("linkCv", { required: false })}
                    isError={errors.linkCv}
                  />
                  <TextArea
                    label={"Summary"}
                    hook={register("summary", { required: true })}
                    isError={errors.summary}
                  />
                </div>

                <div className="col-md-12 d-flex justify-content-end mt-5">
                  <button
                    type="button"
                    className="btn btn-dark mr-2"
                    onClick={() => history.goBack()}
                  >
                    <i className="fa fa-times"></i> <span>Cancel</span>
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-save"></i> <span>Save</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
