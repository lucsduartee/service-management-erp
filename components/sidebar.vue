<template>
  <v-card>
    <v-navigation-drawer theme="dark" permanent>
      <v-list nav>
        <v-list-item
          :prepend-icon="user ? 'mdi-account-check-outline' :'mdi-account-off-outline'"
          :title="user ? user?.first_name + ' ' + user?.last_name : 'Usuário deslogado'"
        >
        </v-list-item>

        <v-divider></v-divider>

        <NuxtLink to="/">
          <v-list-item prepend-icon="mdi-home" value="home"> Home </v-list-item>
        </NuxtLink>
        <NuxtLink to="/services">
          <v-list-item prepend-icon="mdi-cogs" value="services">
            Serviços
          </v-list-item>
        </NuxtLink>
        <NuxtLink to="/accounts-management">
          <v-list-item
            prepend-icon="mdi-account-supervisor-circle"
            value="accountsManagement"
          >
            Gerenciador de contas
          </v-list-item>
        </NuxtLink>
        <v-list-item
          v-if="user"
          @click.prevent="logoutUser"
          prepend-icon="mdi-logout"
          value="logout"
        >
          Sair
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup lang="ts">
const { logout } = useDirectusAuth();
const user = useDirectusUser();

const logoutUser = async () => {
  try {
    await logout();

    return navigateTo("/");
  } catch (e) { }
};
</script>

<style scoped>
.aside {
  flex: 0.15 auto;
  border: 1px solid #000;
  height: 100;
}

.aside__header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.aside__header-image {
  width: 64px;
  height: 64px;
  border: 1px solid #000;
}
</style>