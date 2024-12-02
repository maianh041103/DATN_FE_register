<template>
  <div
    class="register-page"
    :style="{ background: 'url(' + bgRegister + ')' }"
    :class="{ full: successFlag }"
  >
    <div class="logo">
      <img
        height="150px"
        src="@/assets/logo.jpg"
        @click="redirectWebIntroduction"
      />
    </div>
    <div class="content">
      <div class="block-header">
        <h3>Đăng Ký</h3>
      </div>
      <div v-if="successFlag" class="success-register">
        <el-tag type="success"> Đăng ký tài khoản thành công </el-tag>
        <div class="link-login" @click="redirectPageManager">
          Đi tới trang bán hàng<i class="el-icon-d-arrow-right" />
        </div>
        <div class="link-back" @click="redirectWebIntroduction">
          Về Trang chủ
        </div>
      </div>
      <div v-else class="block-content">
        <form @submit.prevent="handleRegister">
          <el-form
            ref="registerForm"
            :model="registerInfo"
            :rules="rules"
            label-position="top"
            label-width="100%"
            @submit.native.prevent="handleRegister"
          >
            <div class="block-left">
              <h5 style="margin-bottom: 22px">Thông tin người dùng</h5>
              <div class="block-item">
                <el-form-item prop="name">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.name,
                    }"
                    @click="() => focusInput('name')"
                    >Họ tên của bạn</span
                  >
                  <el-input ref="name" v-model="registerInfo.name" />
                </el-form-item>
              </div>
              <div class="block-item">
                <el-form-item prop="username">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.username,
                    }"
                    @click="() => focusInput('username')"
                    >Tên đăng nhập</span
                  >
                  <el-input
                    ref="username"
                    v-model.trim="registerInfo.username"
                  />
                </el-form-item>
              </div>
              <div class="block-item">
                <el-form-item prop="password">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.password,
                    }"
                    @click="() => focusInput('password')"
                    >Mật khẩu</span
                  >
                  <el-input
                    ref="password"
                    v-model="registerInfo.password"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>
              <div class="block-item">
                <el-form-item prop="matchingPassword">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.matchingPassword,
                    }"
                    @click="() => focusInput('matchingPassword')"
                    >Nhập lại mật khẩu</span
                  >
                  <el-input
                    ref="matchingPassword"
                    v-model="registerInfo.matchingPassword"
                    type="password"
                    show-password
                  />
                </el-form-item>
              </div>
              <div class="block-item">
                <el-form-item prop="userPhone">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.userPhone,
                    }"
                    @click="() => focusInput('userPhone')"
                    >Điện thoại</span
                  >
                  <el-input ref="userPhone" v-model="registerInfo.userPhone" />
                </el-form-item>
              </div>
              <div class="block-item">
                <el-form-item prop="userEmail">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input-hidden': registerInfo.userEmail,
                    }"
                    @click="() => focusInput('userEmail')"
                    >Email</span
                  >
                  <el-input ref="userEmail" v-model="registerInfo.userEmail" />
                </el-form-item>
              </div>
            </div>
            <div class="block-right">
              <h5 style="margin-bottom: 22px">Thông tin cửa hàng</h5>

              <div style="display: flex; align-items: start">
                <div class="left-info">
                  <div class="block-item">
                    <el-form-item prop="storeName">
                      <span
                        :class="{
                          'label-input label-input-required': true,
                          'label-input-hidden': registerInfo.storeName,
                        }"
                        @click="() => focusInput('storeName')"
                        >Tên cửa hàng</span
                      >
                      <el-input
                        ref="storeName"
                        v-model="registerInfo.storeName"
                      />
                    </el-form-item>
                  </div>
                  <div class="block-item">
                    <el-form-item prop="storePhone">
                      <span
                        :class="{
                          'label-input label-input-required': true,
                          'label-input': true,
                          'label-input-hidden': registerInfo.storePhone,
                        }"
                        @click="() => focusInput('storePhone')"
                        >Điện thoại</span
                      >
                      <el-input
                        ref="storePhone"
                        v-model="registerInfo.storePhone"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="right-info">
                  <div class="block-item">
                    <el-form-item prop="businessRegistrationImage">
                      <span
                        v-if="listFile.length === 0"
                        slot="label"
                        style="
                          position: absolute;
                          z-index: 1;
                          top: 56px;
                          left: 12px;
                          font-size: 10px;
                          opacity: 0.5;
                        "
                        >Giấy phép đăng ký</span
                      >
                      <UploadImage
                        style="position: absolute; top: -20px"
                        @removeUploadImage="removeUploadImageHandle"
                        @getListFile="getListFile"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="block-item" style="clear: both">
                <el-form-item prop="businessRegistrationNumber">
                  <span
                    :class="{
                      // 'label-input label-input-required': true,
                      'label-input': true,
                      'label-input-hidden':
                        registerInfo.businessRegistrationNumber,
                    }"
                    @click="() => focusInput('businessRegistrationNumber')"
                    >Số đăng ký kinh doanh</span
                  >
                  <el-input
                    ref="businessRegistrationNumber"
                    v-model="registerInfo.businessRegistrationNumber"
                  />
                </el-form-item>
              </div>

              <div class="block-item">
                <el-form-item prop="provinceId">
                  <el-select
                    v-model="registerInfo.provinceId"
                    class="filter-item"
                    placeholder="Chọn tỉnh thành"
                    @change="
                      getDistrictByProvinceId(registerInfo.provinceId, true)
                    "
                    filterable
                  >
                    <el-option
                      v-for="item in listProvince"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div class="block-item">
                <el-form-item prop="districtId">
                  <el-select
                    v-model="registerInfo.districtId"
                    class="filter-item"
                    placeholder="Chọn Quận huyện"
                    @change="
                      getWardByDistrictId(
                        registerInfo.provinceId,
                        registerInfo.districtId,
                        true
                      )
                    "
                    filterable
                  >
                    <el-option
                      v-for="item in listDistrict"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div class="block-item">
                <el-form-item prop="wardId">
                  <el-select
                    v-model="registerInfo.wardId"
                    class="filter-item"
                    placeholder="Chọn Phường xã"
                    filterable
                  >
                    <el-option
                      v-for="item in listWard"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div class="block-item">
                <el-form-item prop="address">
                  <span
                    :class="{
                      'label-input label-input-required': true,
                      'label-input': true,
                      'label-input-hidden': registerInfo.address,
                    }"
                    @click="() => focusInput('address')"
                    >Địa chỉ...</span
                  >
                  <el-input ref="address" v-model="registerInfo.address" />
                </el-form-item>
              </div>
            </div>
            <el-row>
              <el-button type="primary" native-type="submit" :loading="loading"
                >Đăng ký</el-button
              >
            </el-row>
          </el-form>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import bgRegister from "@/assets/bg-register.jpg";
import Resource from "@/api/resource";
import UploadImage from "./uploadImage";
import { validEmail, validPhone } from "@/utils/validate";
// import { getToken } from '@/utils/auth'
import axios from "axios";

const registerResource = new Resource("auth/register");
const addressResource = new Resource("address");
const storeResource = new Resource("store");

export default {
  components: { UploadImage },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("Vui lòng nhập đúng định dạng email"));
      } else {
        callback();
      }
    };

    const validateMobile = (rule, value, callback) => {
      if (value && !validPhone(value)) {
        callback(new Error("Vui lòng nhập đúng định dạng số điện thoại"));
      } else {
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Xác nhận mật khẩu là bắt buộc"));
      } else if (value !== this.registerInfo.password) {
        callback(new Error("Mật khẩu không trùng khớp"));
      } else {
        callback();
      }
    };

    return {
      bgRegister: bgRegister,
      listFile: [],
      loading: false,
      successFlag: false,
      listProvince: [],
      listDistrict: [],
      listWard: [],
      registerInfo: {
        name: null,
        username: null,
        password: null,
        matchingPassword: null,
        userEmail: null,
        userAvatar: null,
        userPhone: null,
        storeName: null,
        provinceId: null,
        districtId: null,
        wardId: null,
        address: null,
        address1: null,
        address2: null,
        logo: null,
        storePhone: null,
        storeEmail: null,
        businessRegistrationNumber: null,
        businessRegistrationImage: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Họ tên bạn là bắt buộc",
            trigger: "blur",
          },
          { max: 255, message: "Tối đa 255 ký tự", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            message: "Tên đăng nhập là bắt buộc",
            trigger: "blur",
          },
          { max: 20, message: "Tối đa 20 ký tự", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Mật khẩu là bắt buộc", trigger: "blur" },
          { min: 8, message: "Mật khẩu tối thiểu 8 ký tự", trigger: "blur" },
        ],
        matchingPassword: [
          { required: true, message: "Mật khẩu là bắt buộc", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        userPhone: [
          {
            required: true,
            message: "Số điện thoại là bắt buộc",
            trigger: "blur",
          },
          { validator: validateMobile },
        ],
        userEmail: [
          { required: true, message: "Email là bắt buộc", trigger: "blur" },
          { validator: validateEmail },
        ],
        storePhone: [
          {
            required: true,
            message: "Số điện thoại là bắt buộc",
            trigger: "blur",
          },
          { validator: validateMobile },
        ],
        storeEmail: [
          { required: true, message: "Email là bắt buộc", trigger: "blur" },
          { validator: validateEmail },
        ],
        // businessRegistrationNumber: [
        //   {
        //     required: true,
        //     message: "Số đăng ký kinh doanh là bắt buộc",
        //     trigger: "blur",
        //   },
        // ],
        storeName: [
          {
            required: true,
            message: "Tên cửa hàng là bắt buộc",
            trigger: "blur",
          },
          { max: 255, message: "Tối đa 255 ký tự", trigger: "blur" },
        ],
        provinceId: [
          {
            required: true,
            message: " Tỉnh thành là bắt buộc",
            trigger: "blur",
          },
        ],
        districtId: [
          {
            required: true,
            message: "Quận huyện là bắt buộc",
            trigger: "blur",
          },
        ],
        wardId: [
          { required: true, message: "Phường xã là bắt buộc", trigger: "blur" },
        ],
        address: [
          { required: true, message: "Địa chỉ là bắt buộc", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getProvince();
  },
  methods: {
    focusInput(fieldName) {
      this.$refs[fieldName].focus();
    },
    async registerHandle() {
      const data = _.cloneDeep(this.registerInfo);

      storeResource
        .store({
          name: data.storeName,
          phone: data.storePhone || "",
          provinceId: data.provinceId,
          districtId: data.districtId,
          wardId: data.wardId,
          address: data.address,
          businessRegistrationImageId: data.businessRegistrationImage,
          businessRegistrationNumber: data.businessRegistrationNumber,
        })
        .then((res) => {
          registerResource
            .store({
              username: data.username,
              fullName: data.name,
              password: data.password,
              email: data.userEmail,
              phone: data.userPhone,
              storeId: res.data.id,
            })
            .then((res) => {
              this.loading = false;
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "Đăng ký thành công!",
                });
                this.successFlag = true;
              } else {
                this.$message({
                  type: "error",
                  message: "Có lỗi xảy ra vui lòng thử lại sau!",
                });
              }
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    handleRegister() {
      this.registerInfo = this.trimData(this.registerInfo);
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.uploadImg();
        } else {
          return false;
        }
      });
    },
    createStore() {},
    uploadImg() {
      this.loading = true;
      if (this.listFile && this.listFile.length === 0) {
        // this.$message({
        //   type: "error",
        //   message: "Ảnh giấy phép kinh doanh là bắt buộc",
        // });
        this.registerInfo.businessRegistrationImage = null;

        this.registerHandle();
        this.loading = false;
        return;
      }
      const params = new FormData();
      this.listFile.forEach((everyFile) => {
        params.append("file", everyFile.raw);
      });
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(process.env.VUE_APP_UPLOAD_URL, params, {
          headers: headers,
        })
        .then((res) => {
          if (res.data) {
            this.registerInfo.businessRegistrationImage = res.data.data.id;

            this.registerHandle();
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$message({
            type: "error",
            message: "Có lỗi xảy ra vui lòng thử lại sau!",
          });
        });
    },
    async getProvince() {
      const res = await addressResource.list();

      console.log(res);

      if (res.data.items.length > 0) {
        this.listProvince = res.data.items;
      }

      this.$forceUpdate();
    },
    getDistrictByProvinceId(id, change = false) {
      this.listDistrict = [];
      if (change) {
        this.registerInfo.districtId = null;
        this.registerInfo.ward = null;
      }

      addressResource
        .get(id)
        .then((res) => {
          if (res.data.items.length > 0) {
            this.listDistrict = res.data.items;
          }

          this.$forceUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWardByDistrictId(provinceId, districtId, change = false) {
      this.listWard = [];
      if (change) {
        this.registerInfo.ward = null;
      }

      addressResource
        .getDetailTwoLevel(provinceId, districtId)
        .then((res) => {
          if (res.data.items.length > 0) {
            this.listWard = res.data.items;
          }

          this.$forceUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListFile(listFile) {
      this.listFile = listFile;
    },
    removeUploadImageHandle(file) {
      this.listFile = this.listFile.filter(function (val) {
        return val != file;
      });
    },
    trimData(data) {
      for (const key in data) {
        if (data[key] && typeof data[key] === "string") {
          data[key] = data[key] ? data[key].trim() : null;
        }
      }
      return data;
    },
    redirectPageManager() {
      window.location.href = process.env.VUE_APP_SUCCESS_URL;
    },
    redirectWebIntroduction() {
      window.location.href = "http://mephar.com/";
    },
  },
};
</script>
<style type="text/css" lang="scss">
@media only screen and (max-width: 720px) {
  body {
    .register-page {
      .block-content {
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 20px;
        .block-left {
          width: 100%;
          margin-right: 0;
        }
        .block-right {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
}
.register-page.full {
  height: 100vh;
}
.logo {
  text-align: center;
  img {
    cursor: pointer;
  }
}
.register-page {
  height: 100vh;
  .el-form-item {
    margin-bottom: 10px;
  }
  .success-register {
    text-align: center;
    padding-top: 0;
    .link-login {
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 17px;
      margin-top: 15px;
      text-decoration: underline;
      color: #007bff;
      i {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .link-back {
      font-size: 16px;
      cursor: pointer;
    }
  }
  h5 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .el-row {
    clear: both;
    padding-top: 25px;
    text-align: center;
    .el-button--medium {
      padding: 15px 25px;
      border-radius: 4px;
      font-size: 17px;
    }
  }
  .filter-item {
    width: 100%;
  }

  .el-form-item__content {
    line-height: 40px;
  }

  .el-input--medium .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
  .el-form-item--medium .el-form-item__label {
    padding-bottom: 0;
    font-weight: 400;
    font-size: 14px;
    color: #333;
  }

  .el-upload--picture-card i {
    font-size: 18px;
  }

  .has-data {
    top: 0px !important;
  }

  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
    line-height: 100px;
    margin: 0px !important;
  }

  .block-item {
    position: relative;
    margin-bottom: 20px;
  }

  .label-input {
    position: absolute;
    top: 0;
    left: 16px;
    z-index: 1;
    opacity: 0.3;
  }
  .label-input-hidden {
    visibility: hidden;
  }
  .label-input-required::before {
    content: "* ";
    color: red;
  }
  .content {
    max-width: 800px;
    margin: 0 auto;
    .block-header {
      text-align: center;
      h3 {
        font-size: 33px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .descrption {
        font-size: 16px;
        margin-bottom: 25px;
      }
    }
  }
  .block-left {
    width: calc(50% - 10px);
    float: left;
    margin-right: 10px;
  }
  .block-right {
    width: calc(50% - 10px);
    float: left;
    margin-left: 10px;
    .left-info {
      width: calc(100% - 120px);
      margin-right: 10px;
    }
    .right-info {
      width: 100px;
      margin-left: 10px;
    }
  }
}
</style>
