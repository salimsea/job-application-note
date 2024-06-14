import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox, TextDate, TextInput } from "src/components/atoms";
import { Controller, useForm } from "react-hook-form";
import {
  actCompanyAdd,
  actRefGetStatusCompanies,
  actRefGetTypeUserCompanies,
  actRefGetTypeWorkDays,
  actRefGetTypeWorkPlaces,
} from "src/redux/actions";
import ReactInputMask from "react-input-mask";

const SectionForm = () => {
  const {
    dataRefTypeWorkDays,
    dataRefTypeWorkPlaces,
    dataRefTypeUserCompanies,
    dataRefStatusCompanies,
  } = useSelector((state) => state.refReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actRefGetTypeWorkDays());
    dispatch(actRefGetTypeWorkPlaces());
    dispatch(actRefGetTypeUserCompanies());
    dispatch(actRefGetStatusCompanies());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const btnSave = (data) => dispatch(actCompanyAdd(data));

  return (
    <div className="row clearfix">
      <div className="col-lg-8 col-md-8 mx-auto">
        <div className="card planned_task">
          <div className="header">
            <h2>Form Company</h2>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit(btnSave)}>
              <div className="row">
                <div className="col-md-6">
                  <TextInput
                    label={"Company Name"}
                    hook={register("name", { required: true })}
                    isError={errors.name}
                  />
                  <TextInput
                    label={"Company Email"}
                    hook={register("email", { required: true })}
                    isError={errors.email}
                  />
                  <TextInput
                    label={"Position Job"}
                    hook={register("position", { required: true })}
                    isError={errors.position}
                  />
                  <Controller
                    control={control}
                    name="typeWorkDay"
                    render={({ field, value }) => (
                      <Combobox
                        label={"Type Work Day"}
                        options={dataRefTypeWorkDays}
                        values={value}
                        isError={errors.typeWorkDay}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                    rules={{
                      required: true,
                    }}
                  />
                  <Controller
                    control={control}
                    name="typeWorkPlace"
                    render={({ field, value }) => (
                      <Combobox
                        label={"Type Work Place"}
                        options={dataRefTypeWorkPlaces}
                        values={value}
                        isError={errors.typeWorkPlace}
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
                <div className="col-md-6">
                  <Controller
                    control={control}
                    name="typeUserCompany"
                    render={({ field, value }) => (
                      <Combobox
                        label={"Type User Company"}
                        options={dataRefTypeUserCompanies}
                        values={value}
                        isError={errors.typeUserCompany}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                    rules={{
                      required: true,
                    }}
                  />

                  <TextInput
                    label={"Placement"}
                    hook={register("placement", { required: true })}
                    isError={errors.placement}
                  />

                  <Controller
                    control={control}
                    name={`strAppliedAt`}
                    render={({ field }) => (
                      <TextDate
                        type="text"
                        label={"Applied At"}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd-MM-yyyy"
                        customInput={
                          <ReactInputMask
                            mask="99-99-9999"
                            onChange={field.onChange}
                            value={field.value}
                            maskChar=""
                          />
                        }
                        isError={errors.strAppliedAt}
                      />
                    )}
                    rules={{
                      required: true,
                    }}
                  />

                  <Controller
                    control={control}
                    name="status"
                    render={({ field, value }) => (
                      <Combobox
                        label={"Status Process Recruitment"}
                        options={dataRefStatusCompanies}
                        values={value}
                        isError={errors.status}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                    rules={{
                      required: true,
                    }}
                  />

                  <TextInput
                    label={"Source Job"}
                    hook={register("sourceJob", { required: true })}
                    isError={errors.sourceJob}
                  />

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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
