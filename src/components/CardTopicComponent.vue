<script setup lang="ts">
import type { Topic } from '@/stores/topic'
import TagComponent from './TagComponent.vue'
import HeartFilledIcon from './icons/HeartFilledIcon.vue'
import CommentFilledIcon from './icons/CommentFilledIcon.vue'
import { transformCount } from '@/utils/counterTransform'
import { onMounted, onUnmounted, ref } from 'vue'

interface CardTopicProps {
  topic: Topic
}

const { topic } = defineProps<CardTopicProps>()

const hearts = transformCount(topic.count_heart)
const comments = transformCount(topic.count_comment)

const getCurrentTime = () => {
  return new Date(topic.created_at!).getTime() + topic.timer - new Date().getTime()
}

const timerToString = (time: number) => {
  const totalSeconds = Math.max(Math.floor(time / 1000), 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')
}

const timer = ref<string>(timerToString(getCurrentTime()))

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    const currentTime = getCurrentTime()
    if (currentTime <= 0) {
      timer.value = '00:00:00'
      clearInterval(interval)
    } else {
      timer.value = timerToString(currentTime)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <RouterLink :to="`/topic/${topic.id}`" v-if="getCurrentTime() >= 0">
    <div class="card-topic">
      <div class="card-content">
        <span class="card-current-time">{{ timer }} <span>restantes</span></span>
        <div class="card-title-tags">
          <h2 class="card-title">{{ topic.title }}</h2>
          <ul class="card-tag-list">
            <li v-for="tag in topic.tags" :key="tag.id">
              <TagComponent :content="tag.content" />
            </li>
          </ul>
        </div>
        <span class="card-date-creation">
          Criado em
          {{
            new Date(topic.created_at!).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          }}
        </span>
      </div>
      <div class="card-status">
        <div class="card-status-heart">
          <HeartFilledIcon />
          <span class="card-status-heart-count" :class="{ small: hearts.length > 4 }">{{
            hearts
          }}</span>
        </div>

        <div class="card-status-comment">
          <CommentFilledIcon />
          <span class="card-status-comment-count" :class="{ small: comments.length > 4 }">{{
            comments
          }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.card-topic {
  background-color: $gm-c-blue-soft;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px;

  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.12);

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .card-current-time,
    .card-date-creation {
      font-size: $font-size-base;
      color: $color-timer;
    }

    .card-date-creation {
      font-size: $font-size-sm;
    }

    .card-title-tags {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .card-title {
        font-size: $font-size-4xl;
        font-weight: bold;
        line-height: 1.2;
        color: $gm-c-black;
      }

      .card-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }
  }

  .card-status {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem 2rem;

    .card-status-heart,
    .card-status-comment {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        width: 80px;
        height: 80px;
      }

      .card-status-heart-count,
      .card-status-comment-count {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: $font-size-3xl;
        font-weight: normal;
        color: $gm-c-white;

        &.small {
          font-size: $font-size-lg;
        }
      }
    }
  }

  @include media('mobile') {
    .card-current-time span {
      display: none;
    }
  }

  @include media('tablet') {
    position: relative;
    .card-status {
      height: 100%;
      align-self: flex-start;
      justify-self: flex-end;
      padding: 0;

      .card-status-heart,
      .card-status-comment {
        svg {
          width: 54px;
          height: 54px;
        }

        .card-status-heart-count,
        .card-status-comment-count {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: $font-size-xl;
          font-weight: normal;
          color: $gm-c-white;

          &.small {
            font-size: $font-size-sm;
          }
        }
      }
    }
  }

  @include media('mobile') {
    position: relative;
    .card-status {
      position: absolute;
      padding: 16px;
      top: 0;
      right: 0;
      flex-direction: row;
      height: auto;

      .card-status-heart,
      .card-status-comment {
        svg {
          width: 48px;
          height: 48px;
        }

        .card-status-heart-count,
        .card-status-comment-count {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: $font-size-xl;
          font-weight: normal;
          color: $gm-c-white;

          &.small {
            font-size: $font-size-sm;
          }
        }
      }
    }
  }
}
</style>
