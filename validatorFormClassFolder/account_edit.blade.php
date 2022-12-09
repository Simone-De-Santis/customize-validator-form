@include(PATH_VIEW.'._header')
<div class="bg_content">
    <div class="container pt-4">
        <div class="text-start">
            <h1 class="text-center text-uppercase">{{ __('backend.title_account')}}</h1>


            @if(isset($response_status) && $response_status )
            <div class="alert alert-success" role="alert">
                {{ __('backend.msg_success_edit_account')}}
            </div>
            @elseif( isset($response_status) && $response_status == false)
            <div class="alert alert-danger" role="alert">
                {{ __('backend.msg_error_edit_account')}}
            </div>
            @endif

            <div class='w-100 pb-4 bd-r box-sh-form bg-color-ground px-lg-4 mb-4 px-0 py-4'>
                <form class="needs-validation customValidation" action="{{ route( 'account.account_save' , [  ] ) }}?change_password={{ $change_password ?? 0  }}&saved=1" method="POST"
                      @if($change_password == 1 )
                        oninput='input_account_password.setCustomValidity(input_account_password.value != input_account_password_confirm.value ? "Passwords do not match." : "")'
                      @endif
                >
                    {{ csrf_field() }}

                    @if($change_password == 0 )
                        <div class="row pt-4">
                            <div class="login-box col-lg-4" style="left: 0px;">
                                <div class="user-box">
                                    <input type="text" id=""   name="input_account_name" value="{{ $account['data']['customer']['firstname'] }}" data-validate-type="nameSurname" required>
                                    <label class="label-form">{{ __('backend.title_nome')}} *</label>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="invalid-feedback">{{ __('backend.title_tre_caratteri')}}</div>
                            </div>

                            <div class="login-box col-lg-4" style="left: 0px;">
                                <div class="user-box">
                                    <input type="text" id=""  name="input_account_cognome" value="{{ $account['data']['customer']['lastname'] }}" data-validate-type="nameSurname" required>
                                    <label class="label-form">{{ __('backend.title_cognome')}} *</label>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="invalid-feedback">
                                    {{ __('backend.title_tre_caratteri')}}
                                </div>
                            </div>

                            <div class="login-box col-lg-4" style="left: 0px;">
                                <div class="user-box">
                                    <input type="text" id="" name="input_account_telefono" value="{{ $account['data']['customer']['contact']['telephone'] }}" data-validate-type="phone" data-value-type="cellular"  required>
                                    <label class="label-form">{{ __('backend.title_telefono')}} *</label>
                                    <div class="invalid-feedback"></div>
                                </div>
                                <div class="invalid-feedback">
                                    {{ __('backend.title_tre_caratteri')}}
                                </div>
                            </div>
                        </div>
                    @endif

                    @if($change_password == 1 )
                    <div id="collapsePassword" class="row pt-2">


                        <div class="alert alert-info" role="alert">
                            La nueva contraseña debe contener al menos 8 caracteres
                        </div>

                        <div class="login-box col-lg-6" style="left: 0px;">
                           <div class="user-box">
                                <input type="password" pattern=".{8,50}" id="input_account_password" name="input_account_password" value="" data-validate-compare="password" required>
                                <label for="input_account_password" class="label-form">{{ __('backend.title_password')}} *</label>
                            </div> 
                        </div>

                        <div class="login-box col-lg-6" style="left: 0px;">
                            <div class="user-box">
                                <input type="password" pattern=".{8,50}" id="input_account_password_confirm" required  data-validate-compare="password" name="input_account_password_confirm">
                                <label class="label-form">{{ __('backend.title_conferma_password')}} *</label>
                                <div class="invalid-feedback">{{ __('backend.title_tre_caratteri')}}</div>
                            </div>
                        </div>
                    </div>
                    @endif


                    <div class="col-lg-6 col-md-4 col-12 text-center pt-4" style="margin: 0 auto;">
                        <button type="submit" name="save" class="btn btn-primary" id="submit_save_btn">{{ __('backend.button_modifica_account')}}</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
   

   

    
    
    {{-- ! import file custom validator --}}
    <script src="{{ ASSETS }}/js/validatorFormClassFolder/regex/taxIdRegex.js?{{time()}}" defer></script>
    <script src="{{ ASSETS }}/js/validatorFormClassFolder/regex/postalCodeRegex.js?{{time()}}" defer></script>
    <script src="{{ ASSETS }}/js/validatorFormClassFolder/regex/genericRegex.js?{{time()}}" defer></script>
    <script src="{{ ASSETS }}/js/validatorFormClassFolder/path/localizationPath.js?{{time()}}" defer></script>
    <script src="{{ ASSETS }}/js/validatorFormClassFolder/classValidator.js?{{time()}}" defer></script>
    {{-- ! import file custom validator --}}
    
    <script src="{{ ASSETS }}/js/account_edit.js?{{time()}}" defer></script>






    @include(PATH_VIEW.'._corrieri')
</div>
@include(PATH_VIEW.'._footer')
