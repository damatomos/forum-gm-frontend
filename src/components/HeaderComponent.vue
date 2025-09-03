<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonElasticComponent from './ButtonElasticComponent.vue'
import GMPointIcon from './icons/GMPointIcon.vue'
import { useUserStore } from '@/stores/user'

const route = useRouter()
const user = useUserStore()

function handleSignIn() {
  route.push({
    name: 'login',
  })
}
</script>

<template>
  <header class="header">
    <span class="logo">ForumGM</span>
    <span class="gm-points" v-if="user.isLogged"> <GMPointIcon />850</span>
    <ButtonElasticComponent
      title="Sign In"
      variant="primary"
      @click="handleSignIn"
      v-if="!user.isLogged"
    />
    <div v-if="user.isLogged" class="user-navigation">
      <img
        src="https://www.bing.com/th/id/OIP.b3zlBrTh1y8Wy-IXr5VdWgHaHa?w=196&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt=""
      />
      <span>{{ "Mikhael D'Amato".split(' ')[0].slice(0, 10) }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  background-color: $gm-c-purple;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;

  .logo {
    font-size: $font-size-3xl;
    font-weight: bold;
    color: white;
  }

  .gm-points {
    font-size: $font-size-3xl;
    color: $gm-c-yellow;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .user-navigation {
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @include media('mobile') {
      span {
        display: none;
      }
    }

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-left: 8px;
      object-fit: cover;
    }
  }

  @include media('mobile') {
    padding: 10px 16px;

    .logo {
      font-size: $font-size-xl;
    }

    .gm-points {
      font-size: $font-size-xl;
    }
  }
}
</style>
