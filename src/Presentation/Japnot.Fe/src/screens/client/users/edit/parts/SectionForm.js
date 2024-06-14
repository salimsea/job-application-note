import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox, TextInput } from "src/components/atoms";
import { Controller, useForm } from "react-hook-form";
import { actRefGetRoles, actUserEdit, actUserGetById } from "src/redux/actions";
import { FUNCArraySelectId } from "src/utils";
import { useParams, useHistory } from "react-router-dom";

const SectionForm = () => {
  let params = useParams();
  let history = useHistory();
  const dataRefRoles = useSelector((state) => state.refReducer.dataRefRoles);
  const dataUser = useSelector((state) => state.userReducer.dataUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    dispatch(actRefGetRoles());
    if (!dataUser) dispatch(actUserGetById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params]);

  useEffect(() => {
    if (dataUser) {
      setValue("id", params.id);
      setValue("username", dataUser?.Username);
      setValue("email", dataUser?.Email);
      setValue("firstName", dataUser?.FirstName);
      setValue("middleName", dataUser?.MiddleName);
      setValue("lastName", dataUser?.LastName);
      setValue("roles", FUNCArraySelectId(dataUser?.Roles));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  const btnSave = (data) => dispatch(actUserEdit(data));

  return (
    <div className="row clearfix">
      <div className="col-lg-8 col-md-8 mx-auto">
        <div className="card planned_task">
          <div className="header">
            <h2>Form User</h2>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit(btnSave)}>
              <div className="row">
                <div className="col-md-12">
                  <TextInput
                    label={"Username"}
                    hook={register("username", { required: true })}
                    isError={errors.username}
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

                  <Controller
                    control={control}
                    name="roles"
                    render={({ field }) => (
                      <Combobox
                        label={"Role"}
                        options={dataRefRoles}
                        values={getValues("roles")}
                        multi={true}
                        isError={errors.roles}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                    rules={{
                      required: true,
                    }}
                  />
                </div>

                <div className="col-md-12 d-flex justify-content-end mt-5">
                  <button
                    type="button"
                    className="btn btn-dark mr-2"
                    onClick={() => history.goBack()}
                  >
                    <i className="fa fa-times"></i> <span>Back</span>
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
