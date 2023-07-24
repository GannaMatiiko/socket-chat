<template>
    <v-container class="full-vh">
        <v-responsive class="d-flex align-center text-center fill-height">
                <v-sheet width="4npm run serve00" class="mx-auto login-form">
                    <div class="login-form__block-img">
                        <img src="@/assets/login.svg" alt="Chat">
                    </div>
                    <div class="login-form__block-form">
                        <h2 class="mb-10">Let's connect to chat!</h2>
                        <v-form @submit.prevent="processLogin" ref="loginForm" class="login-form__form">
                            <v-text-field
                            v-model="email"
                            :rules="rules"
                            label="Enter your e-mail"
                            autocomplete="on"
                            ></v-text-field>
                            <v-btn v-if="!isLoaded" type="submit" block class="mt-2">Login</v-btn>
                            <v-progress-circular
                                v-else
                                indeterminate
                                color="green"
                            ></v-progress-circular>
                        </v-form>
                    </div>
                </v-sheet>
                <v-snackbar v-model="snackbar" color="deep-orange-darken-2">Some problem with login...</v-snackbar>
        </v-responsive>
    </v-container>
</template>

<script>
// import socket from '@/plugins/socket.js'
export default {
    data: () => ({
        isLoaded: false,
        email: '',
        rules: [
            value => /.+@.+/.test(value) || 'Invalid Email address'
        ],
        snackbar: false,
    }),
    methods: {
        processLogin() {
            this.$refs.loginForm.validate()
                .then(data => {
                    if (data.valid) {
                        this.isLoaded = true;
                        this.axios.post('users/login', {
                            'email': this.email,
                            "timezone": new Date().getTimezoneOffset() / (-60)

                        }).then((response) => {
                            this.$store.dispatch('setUser', response.data);
                            this.$router.replace('/');
                        })
                        .catch((error) => {
                            this.snackbar = true;
                            throw new Error(error.message);
                        });
                    }
                })
        }
    }
}
</script>

<style scoped lang="scss">
.full-vh {
    height: 100vh;
}
.login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    &__block {
        &-img {
            width: 40%;
            background: $lightGreen;
            height: 400px;
            img {
                height: 400px;
                width: 100%;
            }
        }
        &-form {
            width: 60%;
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: $yellow;
            form {
                padding: 0 20%;
            }
        }
    }
}
</style>