import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox, TextInput } from "src/components/atoms";
import { Controller, useForm } from "react-hook-form";
import { actRefGetRoles, actUserAdd } from "src/redux/actions";

const SectionForm = () => {
  const dataRefRoles = useSelector((state) => state.refReducer.dataRefRoles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actRefGetRoles());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const btnSave = (data) => dispatch(actUserAdd(data));

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
                    render={({ field, value }) => (
                      <Combobox
                        label={"Role"}
                        options={dataRefRoles}
                        values={value}
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
                    onClick={() => reset()}
                  >
                    <i className="fa fa-times"></i> <span>Reset</span>
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
