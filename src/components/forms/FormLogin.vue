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
                            ></v-text-field>
                            <v-btn type="submit" block class="mt-2">Login</v-btn>
                        </v-form>
                    </div>

                </v-sheet>
        </v-responsive>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        email: '',
        rules: [
            value => /.+@.+/.test(value) || 'Invalid Email address'
        ],
    }),
    methods: {
        processLogin() {
            this.$refs.loginForm.validate()
                .then(data => {
                    if (data.valid) {
                        this.$soketio.emit('login', this.email)
                        this.$router.replace('/')
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