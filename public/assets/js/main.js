// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    var user = {
        type: "manager",
        icon: {
            csr: '<button class="btn btn-outline-warning w-100"><i class="fas fa-user"></i> CSR</button>',
            technician: '<button class="btn btn-outline-warning w-100"><i class="fas fa-headset"></i> Technician</button>',
            manager: '<button class="btn btn-outline-warning w-100"><i class="fas fa-user-tie"></i> Manager</button>',
        }
    };
    var keys = {
        table: {
            company: [
                "id",
                "name",
                "contact",
                "email",
                "phone",
                "country",
                "city",
                "more"
            ],
            staff: [
                "id",
                "name",
                "role",
                "phone",
                "email",
                "status",
                "createdAt",
                "more",
            ],
            ticket: [
                "id",
                "name",
                "company",
                "technician",
                "isFinished",
                "createdAt",
                "updatedAt",
                "more",
            ],
        },
        modal: {
            profile: [
                "name",
                "role",
                "phone",
                "email",
                "password"
            ],
            company: [
                "name",
                "contact",
                "email",
                "phone",
                "address1",
                "address2",
                "city",
                "province",
                "postal",
                "country"
            ],
            staff: [
                "name",
                "role",
                "phone",
                "email",
                "password",
            ],
            ticket: [
                "name",
                "company",
                "technician",
                "phone",
                "email",
                "description",
                "resolution",
                "isFinished",
            ],
        },
    };
    var moreButtons = {
        delete_btn: '<button class="btn btn-sm btn-outline-danger cmd" data-cmd="delete" ><i class="fas fa-trash-alt"></i></button>',
        view_btn: '<button class="btn btn-sm btn-warning mx-1 cmd" data-cmd="view"><i class="fas fa-eye"></i></button>',
        edit_btn: '<button class="btn btn-sm btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i></button>',
        csr: {},
        manager: {},
        technician: {},
        initialize: function () {
            moreButtons.manager = {
                staff: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
                company: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
                ticket: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
            };
            moreButtons.csr = {
                staff: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
                company: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
                ticket: moreButtons.edit_btn + moreButtons.view_btn + moreButtons.delete_btn,
            };
            moreButtons.technician = {
                staff: moreButtons.view_btn,
                company: moreButtons.view_btn,
                ticket: moreButtons.edit_btn + moreButtons.view_btn,
            };
        },
    };
    moreButtons.initialize();

    var modalContent = {
        progress: '<div class="progress mx-4 mb-2"><div class="progress-bar progress-bar-striped progress-bar-animated"></div></div><span class="text-dark h5 progress-state"></span>',
        header: {
            profile: '<button class="btn btn-outline-light"><i class="fas fa-user-edit"></i> My Profile</button>',
            staff: '<button class="btn btn-outline-light"><i class="fas fa-users"></i> Staff</button>',
            company: '<button class="btn btn-outline-light"><i class="fas fa-building"></i> Company</button>',
            ticket: '<button class="btn btn-outline-light"><i class="fas fa-clipboard-list"></i> Ticket</button>',
            logout: '<button class="btn btn-outline-light"><i class="fas fa-user-shield"></i> Session</button>',
            register: '<button class="btn btn-outline-light"><i class="fas fa-user-plus"></i> Register</button>',
        },
        body: {
            profile: '<div class="container pl-3"><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-user"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="name" placeholder="Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-users"></i></button></div><div class="col"><div class="input-group"><select class="form-control" required name="role"><option value="" selected>Select a Role</option><option value="csr">CSR</option><option value="technician">Technician</option><option value="manager">Manager</option></select></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-phone"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="phone" placeholder="Phone Number"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-envelope"></i></button></div><div class="col"><div class="input-group"><input type="email" class="form-control" name="email" placeholder="Email Address"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-warning" disabled><i class="fas fa-key"></i></button></div><div class="col"><div class="input-group"><input type="password" class="form-control" name="password" placeholder="Password"></div></div></div></div>',
            staff: '<div class="container pl-3"><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-user"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="name" placeholder="Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-users"></i></button></div><div class="col"><div class="input-group"><select class="form-control" required name="role"><option value="" selected>Select a Role</option><option value="csr">CSR</option><option value="technician">Technician</option><option value="manager">Manager</option></select></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-phone"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="phone" placeholder="Phone Number"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-envelope"></i></button></div><div class="col"><div class="input-group"><input type="email" class="form-control" name="email" placeholder="Email Address"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-warning" disabled><i class="fas fa-key"></i></button></div><div class="col"><div class="input-group"><input type="password" class="form-control" name="password" placeholder="Password"></div></div></div></div>',
            company: '<div class="container pl-3"><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-building"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="name" placeholder="Company Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-user"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="contactname" placeholder="Contact Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-envelope"></i></button></div><div class="col"><div class="input-group"><input type="email" class="form-control" name="email" placeholder="Email"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-phone"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="phone" placeholder="Phone"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-map-marker-alt"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="address1" placeholder="Address 1 (Required)"></div><div class="input-group"><input type="text" class="form-control" name="address2" placeholder="Address 2 (Optional)"></div></div></div>' +
                '<div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-map-marked-alt"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="city" placeholder="City"><input type="text" class="form-control" name="province" placeholder="Province/State"></div><div class="input-group"><input type="text" class="form-control" name="postal" placeholder="Postal Code"><select class="form-control" required name="country"><option value="" selected>Select a Country</option><option value="AF">Afghanistan</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AG">Angola</option><option value="AI">Anguilla</option><option value="AG">Antigua &amp; Barbuda</option><option value="AR">Argentina</option><option value="AA">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BL">Bonaire</option><option value="BA">Bosnia &amp; Herzegovina</option><option value="BW">Botswana</option>' +
                '<option value="BR">Brazil</option><option value="BC">British Indian Ocean Ter</option><option value="BN">Brunei</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="IC">Canary Islands</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CD">Channel Islands</option><option value="CL">Chile</option><option value="CN">China</option><option value="CI">Christmas Island</option><option value="CS">Cocos Island</option><option value="CO">Colombia</option><option value="CC">Comoros</option><option value="CG">Congo</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CT">Cote D-Ivoire</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CB">Curacao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="TM">East Timor</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FA">Falkland Islands</option>' +
                '<option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="FS">French Southern Ter</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GB">Great Britain</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GN">Guinea</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HW">Hawaii</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IA">Iran</option><option value="IQ">Iraq</option><option value="IR">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="NK">Korea North</option><option value="KS">Korea South</option><option value="KW">Kuwait</option>' +
                '<option value="KG">Kyrgyzstan</option><option value="LA">Laos</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macau</option><option value="MK">Macedonia</option><option value="MG">Madagascar</option><option value="MY">Malaysia</option><option value="MW">Malawi</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="ME">Mayotte</option><option value="MX">Mexico</option><option value="MI">Midway Islands</option><option value="MD">Moldova</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Nambia</option><option value="NU">Nauru</option><option value="NP">Nepal</option><option value="AN">Netherland Antilles</option><option value="NL">Netherlands (Holland, Europe)</option><option value="NV">Nevis</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NW">Niue</option>' +
                '<option value="NF">Norfolk Island</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau Island</option><option value="PS">Palestine</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PO">Pitcairn Island</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="ME">Republic of Montenegro</option><option value="RS">Republic of Serbia</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russia</option><option value="RW">Rwanda</option><option value="NT">St Barthelemy</option><option value="EU">St Eustatius</option><option value="HE">St Helena</option><option value="KN">St Kitts-Nevis</option><option value="LC">St Lucia</option><option value="MB">St Maarten</option><option value="PM">St Pierre &amp; Miquelon</option><option value="VC">St Vincent &amp; Grenadines</option><option value="SP">Saipan</option><option value="SO">Samoa</option><option value="AS">Samoa American</option><option value="SM">San Marino</option><option value="ST">Sao Tome &amp; Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SK">Slovakia</option>' +
                '<option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="OI">Somalia</option><option value="ZA">South Africa</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="SR">Suriname</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syria</option><option value="TA">Tahiti</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania</option><option value="TH">Thailand</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad &amp; Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TU">Turkmenistan</option><option value="TC">Turks &amp; Caicos Is</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US">United States of America</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VS">Vatican City State</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="VB">Virgin Islands (Brit)</option><option value="VA">Virgin Islands (USA)</option><option value="WK">Wake Island</option><option value="WF">Wallis &amp; Futana Is</option><option value="YE">Yemen</option><option value="ZR">Zaire</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option></select></div></div></div></div>',
            ticket: '<div class="container pl-3"><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-user"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="name" placeholder="Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-building"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="company" placeholder="Company Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-headset"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="technician" placeholder="Technician Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-phone"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="phone" placeholder="Phone Number"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-envelope"></i></button></div><div class="col"><div class="input-group"><input type="email" class="form-control" name="email" placeholder="Email"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-info"></i></button></div><div class="col"><div class="input-group"><textarea class="form-control mh-2" name="description" placeholder="Description" rows="2"></textarea></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-search"></i></button></div><div class="col"><div class="input-group"><textarea class="form-control" name="resolution" placeholder="Resolution" rows="2"></textarea></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-secondary" disabled><i class="fas fa-flag-checkered"></i></button></div><div class="col"><div class="btn-group btn-group-toggle d-flex h-100" data-toggle="buttons"><button class="btn btn-outline-info" name="isFinished" value="true"><input type="radio"><i class="fas fa-check"></i></button><button class="btn btn-outline-warning active" name="isFinished" value="false"><input type="radio"><i class="fas fa-times"></i></button></div></div></div></div>',
            logout: '<div class="container pl-3"><p class="h5"> Do you want to Signout!</p></div>',
            register: '<div class="container pl-3"><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-info" disabled><i class="fas fa-user"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="name" placeholder="Name"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-users"></i></button></div><div class="col"><div class="input-group"><select class="form-control" required name="role"><option value="" selected>Select a Role</option><option value="csr">CSR</option><option value="technician">Technician</option><option value="manager">Manager</option></select></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-phone"></i></button></div><div class="col"><div class="input-group"><input type="text" class="form-control" name="phone" placeholder="Phone Number"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-dark" disabled><i class="fas fa-envelope"></i></button></div><div class="col"><div class="input-group"><input type="email" class="form-control" name="email" placeholder="Email Address"></div></div></div><div class="form-row form-group"><div class="input-group-prepend"><button class="btn btn-warning" disabled><i class="fas fa-key"></i></button></div><div class="col"><div class="input-group"><input type="password" class="form-control" name="password" placeholder="Password"></div></div></div></div>',
        },
        footer: {
            new: '<button class="btn btn-secondary dismiss-modal"><i class="fas fa-times"></i> Cancel</button><button class="btn btn-warning cmd" data-cmd="new" data-rdy="true"><i class="fas fa-plus-circle"></i> Add</button>',
            edit: '<button class="btn btn-secondary dismiss-modal"><i class="fas fa-times"></i> Cancel</button><button class="btn btn-primary cmd" data-cmd="edit" data-rdy="true"><i class="fas fa-save"></i> Apply</button>',
            delete: '<button class="btn btn-secondary dismiss-modal"><i class="fas fa-times"></i> Cancel</button><button class="btn btn-danger cmd" data-cmd="delete" data-rdy="true"><i class="fas fa-trash-alt"></i> Delete</button>',
            view: {
                profile: '<button class="btn btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-warning dismiss-modal"><i class="fas fa-arrow-circle-right"></i> Return</button>',
                staff: '<button class="btn btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-warning dismiss-modal"><i class="fas fa-arrow-circle-right"></i> Return</button>',
                company: '<button class="btn btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-warning dismiss-modal"><i class="fas fa-arrow-circle-right"></i> Return</button>',
                ticket: '<button class="btn btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-warning dismiss-modal"><i class="fas fa-arrow-circle-right"></i> Return</button>',
                view: '<button class="btn btn-info cmd" data-cmd="edit"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-warning dismiss-modal"><i class="fas fa-arrow-circle-right"></i> Return</button>',
                logout: '<button class="btn btn-secondary dismiss-modal"><i class="fas fa-times"></i> Cancel</button><button class="btn btn-danger cmd" data-cmd="logout" data-rdy="true"><i class="fas fa-sign-out-alt"></i> Logout</button>',
                register: '<button class="btn btn-secondary dismiss-modal"><i class="fas fa-times"></i> Cancel</button><button class="btn btn-primary cmd" data-cmd="register" data-rdy="true"><i class="fas fa-user-check"></i> Submit</button>',
            },
        }
    };

    function DashboardUpdate() {
        //setting up dashboard's tables font weight, alignment and width
        $("tr").addClass("font-weight-light");
        $("th").addClass("font-weight-normal");
        $("tr td, tr th").addClass("text-center align-middle noselect");
        $("tr td:last-child button").css("width", "3em");
        $("thead tr:first-child th:last-child").css("min-width", "9em");

        //adding buttons into `More` column in each table
        for (let id = 0; id < $("table").length; id++) {
            let t_name = $("table:nth(" + id + ")").data("type");
            $("table:nth(" + id + ") tbody tr td[data-name=more]").html(moreButtons[user.type][t_name]);
        }
        if (user.type === "technician") {
            $("button[data-cmd=new]").prop('disabled', true);

        }

        //set rows data-id from its `id` header
        for (let id = 0; id < $("table tbody tr th").length; id++) {
            var header = $("table tbody tr th:nth(" + id + ")");
            header.closest("tr").attr("data-id", header.html());
        }

        //setting up the width of the modal's fields
        $(".input-group-prepend button").css("width", "2.75em");
        $("textarea").css("min-height", "3em");
    }

    function handle_cmd(event) {
        event.preventDefault();

        //Preparing values from html fields
        var table_name = $(this).closest("table").data("type");
        var row_id = $(this).closest("tr").data("id");
        var btn_dtype = $(this).data("type");
        var btn_rowid = $(this).data("id");
        var btn_cmd = $(this).data("cmd");
        var is_rdy = $(this).data("rdy");
        //setting up values for processing
        var cmd = btn_cmd;
        var d_type = btn_dtype;
        var r_id = btn_rowid;
        if (!d_type) { d_type = table_name; }
        if (!r_id) { r_id = row_id; }

        console.log('row_id: ', r_id);
        console.log('data_type: ', d_type);
        console.log('cmd: ', cmd);

        //check if we need to send request to server or just show a modal
        handle_request(r_id, cmd, d_type, is_rdy);
        if (is_rdy === true) {
            console.log('send');
        } else {
            console.log('show modal');
            renderModal(r_id, cmd, d_type);
            DashboardUpdate();
        }
    }
    function renderModal(r_id, cmd, d_type) {
        var header = modalContent.header[d_type];
        var body = modalContent.body[d_type] + modalContent.progress;
        var footer = modalContent.footer[cmd];
        if (cmd === "view") {
            footer = footer[d_type];
        }
        //filling the modal
        $(".modal-header").html(header);
        $(".modal-body").html(body);
        $(".modal-footer").html(footer);
        $(".modal").modal('show');

        //lock the modal fields if the modal is in view or delete modes
        if (cmd === "view" || cmd === "delete") {
            $(".modal-body input, .modal-body button, .modal-body select, .modal-body textarea").prop('disabled', true);
        }

        if (r_id) {
            $(".modal-header").append('<button class="btn btn-outline-light"><i class="fas fa-hashtag"></i> ' + r_id + '</button>');
        }
        //assign to the modal the request parameters
        $(".modal-footer .cmd").attr({
            "data-type": d_type,
            "data-id": r_id,
        });

    }

    function handle_request(r_id, cmd, d_type, is_rdy) {

        //showing the pregress bar
        if (cmd === "view") {
            $(".progress-bar").removeClass("bg-dark-blue").removeClass("bg-danger").removeClass("bg-success").addClass("w-100");
            $(".progress-state").text("Getting information...");
        } else {
            $(".progress-bar").removeClass("bg-dark-blue").removeClass("bg-danger").removeClass("bg-success").addClass("w-100");
            $(".progress-state").text("Processing...");
        }

        //preparing the request options
        var request = prepare_request(r_id, cmd, d_type);

        //getting data from modal fields
        if (is_rdy) {
            for (var id in keys.modal[d_type]) {
                let key = keys.modal[d_type][id];
                request.data[key] = $("input[name=" + key + "], select[name=" + key + "], textarea[name=" + key + "], button[name=" + key + "].active").val();
            }
        }
        if (cmd === "new" && !is_rdy) {
            request.route = "";
        }
        if (request.route.length > 0) {

            //sending request
            $.ajax(request.route, {
                type: request.type,
                data: request.data
            }).then(function (response) {
                if (cmd === "view") {
                    setTimeout(function () {
                        $(".progress-bar").removeClass("w-100");
                        $(".progress-state").text("");
                    }, 750);
                } else {
                    setTimeout(function () {
                        $(".progress-bar").addClass("bg-success");
                        $(".progress-state").text("Successful!");
                        setTimeout(function () {
                            hideModal();
                        }, 500)
                    }, 750);
                }

                //handling the data as type of cmd
                switch (cmd) {
                    case "edit":
                        if (r_id !== undefined) {
                            $("table[data-type=" + d_type + "] tbody tr[data-id=" + r_id + "]").html(render_row(response, d_type).html());
                        }
                        break;

                    case "new":
                        $("table[data-type=" + d_type + "] tbody").append(render_row(response, d_type));
                        break;

                    case "delete":
                        $("table[data-type=" + d_type + "] tbody tr[data-id=" + r_id + "]").remove();
                        break;

                    case "view":
                        for (var key in response) {
                            $("input[name=" + key + "], select[name=" + key + "]").val(response[key]);
                            $("button[name=" + key + "] input[value=" + response[key] + "]").closest("button").addClass("active");
                        }
                        break;
                }
                DashboardUpdate();
            }).catch(function (error) {
                setTimeout(function () {
                    if (!is_rdy) {
                        $(".progress-bar").addClass("w-100").addClass("bg-dark-blue");
                        $(".progress-state").text("Failed to Retrieve data!");
                    } else {
                        $(".progress-bar").addClass("bg-danger");
                        $(".progress-state").text("Failed to Send data!");
                    }
                }, 750);
            });
        }

    }

    function prepare_request(r_id, cmd, d_type) {
        var types = {
            new: "POST",
            view: "GET",
            edit: "PUT",
            delete: "DELETE",
            logout: "POST",
            register: "POST",
        };
        var routes = {
            profile: {
                view: "api/profile",
                edit: "api/profile",
            },
            staff: {
                new: "api/staff",
                view: "api/staff" + r_id,
                edit: "api/staff/" + r_id,
                delete: "api/staff/" + r_id,
            },
            company: {
                new: "api/company",
                view: "api/company" + r_id,
                edit: "api/company/" + r_id,
                delete: "api/company/" + r_id,
            },
            ticket: {
                new: "api/ticket",
                view: "api/ticket" + r_id,
                edit: "api/ticket/" + r_id,
                delete: "api/ticket/" + r_id,
            },
            logout: {
                view: "",
                logout: "api/logout",
            },
            register: {
                view: "",
                register: "api/register",
            },
        };
        return {
            type: types[cmd],
            route: routes[d_type][cmd],
            data: {}
        };
    }

    function render_row(response, d_type) {

        var row = $("<tr>")
            .append(
            );
        for (var id in keys.table[d_type]) {
            let cell = $("<td>");
            if (id === 0) cell = $("<th scope='row'>");
            let key = keys.table[d_type][id];
            row.append(cell.attr("data-name", key).text(response[key]));
        }
        return row;
    }

    function hideModal() {
        $(".modal-header").empty();
        $(".modal-body").empty();
        $(".modal-footer").empty();
        $(".modal").modal('hide');
    }

    $(document).on("click", ".cmd", handle_cmd);
    $(document).on("click", '.modal:not(.show), .dismiss-modal', hideModal);
    $(".navbar-brand").html(user.icon[user.type]);
    DashboardUpdate();
});