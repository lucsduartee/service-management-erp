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

        <v-list-item prepend-icon="mdi-home" value="home">
          <NuxtLink to="/">Home</NuxtLink>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cogs" value="services">
          <NuxtLink to="/services">Serviços</NuxtLink>
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account-supervisor-circle"
          value="accountsManagement"
        >
          <NuxtLink to="/accounts-management">Gerenciador de contas</NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

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