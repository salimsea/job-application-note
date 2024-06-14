import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox, TextDate, TextInput } from "src/components/atoms";
import { Controller, useForm } from "react-hook-form";
import {
  actCompanyEdit,
  actCompanyGetById,
  actRefGetStatusCompanies,
  actRefGetTypeUserCompanies,
  actRefGetTypeWorkDays,
  actRefGetTypeWorkPlaces,
} from "src/redux/actions";
import { FUNCDateDmytoYmd } from "src/utils";
import { useParams, useHistory } from "react-router-dom";
import ReactInputMask from "react-input-mask";

const SectionForm = () => {
  let params = useParams();
  let history = useHistory();
  const dataCompany = useSelector((state) => state.companyReducer.dataCompany);
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
    setValue,
  } = useForm();

  useEffect(() => {
    if (!dataCompany) dispatch(actCompanyGetById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params]);

  useEffect(() => {
    if (dataCompany) {
      setValue("id", params.id);
      setValue("name", dataCompany?.Name);
      setValue("email", dataCompany?.Email);
      setValue("position", dataCompany?.Position);
      // setValue("middleName", dataCompany?.MiddleName);
      // setValue("lastName", dataCompany?.LastName);
      // setValue("address", dataCompany?.Address);
      setValue("typeWorkDay", [
        {
          value: dataCompany?.TypeWorkDay?.Id,
          label: dataCompany?.TypeWorkDay?.Name,
        },
      ]);
      setValue("typeWorkPlace", [
        {
          value: dataCompany?.TypeWorkPlace?.Id,
          label: dataCompany?.TypeWorkPlace?.Name,
        },
      ]);
      setValue("typeUserCompany", [
        {
          value: dataCompany?.TypeUserCompany?.Id,
          label: dataCompany?.TypeUserCompany?.Name,
        },
      ]);
      setValue("status", [
        {
          value: dataCompany?.Status?.Id,
          label: dataCompany?.Status?.Name,
        },
      ]);
      setValue("placement", dataCompany?.Placement);
      setValue(
        "strAppliedAt",
        new Date(FUNCDateDmytoYmd(dataCompany?.AppliedAt))
      );
      setValue("sourceJob", dataCompany?.SourceJob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCompany]);

  const btnSave = (data) => dispatch(actCompanyEdit(data));

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
                    render={({ field }) => {
                      return (
                        <Combobox
                          label={"Type Work Day"}
                          options={dataRefTypeWorkDays}
                          values={field.value}
                          isError={errors.typeWorkDay}
                          onChange={(val) => {
                            field.onChange(val);
                          }}
                        />
                      );
                    }}
                    rules={{
                      required: true,
                    }}
                  />
                  <Controller
                    control={control}
                    name="typeWorkPlace"
                    render={({ field }) => (
                      <Combobox
                        label={"Type Work Place"}
                        options={dataRefTypeWorkPlaces}
                        values={field.value}
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
                    render={({ field }) => (
                      <Combobox
                        label={"Type User Company"}
                        options={dataRefTypeUserCompanies}
                        values={field.value}
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
                    render={({ field }) => (
                      <Combobox
                        label={"Status Process Recruitment"}
                        options={dataRefStatusCompanies}
                        values={field.value}
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
                      onClick={() => history.goBack()}
                    >
                      <i className="fa fa-times"></i> <span>Back</span>
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
