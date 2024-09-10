<template>
  <v-card>
    <v-navigation-drawer theme="dark" permanent>
      <v-list nav>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Birulinha"
          nav
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
      </v-list>
    </v-navigation-drawer>
    <v-btn
      type="button"
      @click.prevent="submit"
    >
      Sair
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
const { logout } = useDirectusAuth();
const submit = async () => {
  logout();
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