'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const LinksContext = createContext()

export const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState({
    link1:
      'https://www.expressvpn.com/go/vpnmentor?irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40&irgwc=1&shareid=&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40',
    link2:
      'https://www.cyberghostvpn.com/offer/best?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8M3wxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=1004&source=greatvpnEN',
    link3:
      'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8NHwxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=7761&source=general',
    link4:
      'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
    link5:
      'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8Nnw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
    link6: 'https://privatevpn.com/',
    link7: 'https://www.totalvpn.com/buy-now',
    link8:
      'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8NHwxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=7761&source=general',
    link9:
      'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    link1Ru: 'https://freevpnplanet.com/',
    link2Ru: 'https://vpnsatoshi.com/',
    link3Ru: 'https://www.astrill.com/',
    link4Ru: 'https://protonvpn.com/',
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const savedLinks = localStorage.getItem('savedLinks')
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks)
        setLinks((prevLinks) => ({
          ...prevLinks,
          ...parsedLinks,
        }))
      } catch (error) {
        console.error('Error parsing savedLinks:', error)
      }
    }
  }, [])

  const [visibleBlock, setVisibleBlock] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedBlock = localStorage.getItem('visibleBlock')
      return savedBlock !== null ? JSON.parse(savedBlock) : 'block1'
    }
    return 'block1'
  })

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('visibleBlock', JSON.stringify(visibleBlock))
    }
  }, [visibleBlock, isClient])

  const setNewLinks1 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpnmentor?irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40&irgwc=1&shareid=&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40',
      link2:
        'https://www.cyberghostvpn.com/offer/best?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8M3wxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=1004&source=greatvpnEN',
      link3:
        'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8NHwxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=7761&source=general',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8Nnw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU05NldDU0ZWNUwiLCJjaWQiOiIxfE0wSU05NldDU0ZWNUx8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    setVisibleBlock('block1')
  }

  const setNewLinks2 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpnmentor?irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40&irgwc=1&shareid=&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vRSZDX3sQ40',
      link2:
        'https://www.cyberghostvpn.com/offer/best?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8M3wxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=1004&source=greatvpnEN',
      link3:
        'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8NHwxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312029_o&noForceCondition=true&aff_id=7761&source=general',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSUxIVVFTQ1E2NVEiLCJjaWQiOiIxfE0wSUxIVVFTQ1E2NVF8Nnw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU05NldDU0ZWNUwiLCJjaWQiOiIxfE0wSU05NldDU0ZWNUx8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    setVisibleBlock('block1')
  }

  const setNewLinks3 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/unrestricted-1?irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vkVpDX3sQ40&shareid=&irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vkVpDX3sQ40',
      link2:
        'https://www.cyberghostvpn.com/offer/bestus?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU1JTFZDQlpaQUkiLCJjaWQiOiIxfE0wSU1JTFZDQlpaQUl8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312059_o&noForceCondition=true&aff_id=1004&source=USAen',
      link3:
        'https://www.privateinternetaccess.com/offer/bestus?source=us&coupon=2Y2M&brand=vpnMentorbb&aff_sub4=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU1JTFZDQlpaQUkiLCJjaWQiOiIxfE0wSU1JTFZDQlpaQUl8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312059_o&aff_id=7761',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU1JTFZDQlpaQUkiLCJjaWQiOiIxfE0wSU1JTFZDQlpaQUl8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU05NldDU0ZWNUwiLCJjaWQiOiIxfE0wSU05NldDU0ZWNUx8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }

  const setNewLinks4 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpnmentor?shareid=&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vm0xDX3sQ40&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vm0xDX3sQ40&irgwc=1',
      link2:
        'https://www.cyberghostvpn.com/offer/access?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU1RNVA4UUE3QzQiLCJjaWQiOiIxfE0wSU1RNVA4UUE3QzR8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312104_o&noForceCondition=true&aff_id=1004&source=mainen',
      link3:
        'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU1RNVA4UUE3QzQiLCJjaWQiOiIxfE0wSU1RNVA4UUE3QzR8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312104_o&noForceCondition=true&aff_id=7761&source=general',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU1RNVA4UUE3QzQiLCJjaWQiOiIxfE0wSU1RNVA4UUE3QzR8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU1RNVA4UUE3QzQiLCJjaWQiOiIxfE0wSU1RNVA4UUE3QzR8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks5 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/offer/vpn-server/australia-vpn?xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vjSpDX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vjSpDX3sQ40&irgwc=1&shareid=',
      link2:
        'https://www.cyberghostvpn.com/offer/bestau?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU4wWjlGUzAxNVoiLCJjaWQiOiIxfE0wSU4wWjlGUzAxNVp8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312116_o&aff_id=1004&source=bestAUen',
      link3:
        'https://www.privateinternetaccess.com/offer/bestau?source=au&coupon=2Y2M&brand=vpnMentorb&aff_sub4=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU4wWjlGUzAxNVoiLCJjaWQiOiIxfE0wSU4wWjlGUzAxNVp8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312116_o&aff_id=7761',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/servers/australia/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU4wWjlGUzAxNVoiLCJjaWQiOiIxfE0wSU4wWjlGUzAxNVp8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/best-vpn-for-australia?aff=vpnmentor&coupon=topvpnoffer&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU4wWjlGUzAxNVoiLCJjaWQiOiIxfE0wSU4wWjlGUzAxNVp8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks6 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/offer/vpn-server/uk-vpn?xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vn0JDX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vn0JDX3sQ40&shareid=&irgwc=1',
      link2:
        'https://www.cyberghostvpn.com/offer/bestuk?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU5DQ1c0NkM5WEUiLCJjaWQiOiIxfE0wSU5DQ1c0NkM5WEV8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312121_o&aff_id=1004&source=bestUKen',
      link3:
        'https://www.privateinternetaccess.com/offer/bestgb?source=uk&coupon=2Y2M&brand=vpnMentorb&aff_sub4=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU5DQ1c0NkM5WEUiLCJjaWQiOiIxfE0wSU5DQ1c0NkM5WEV8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312121_o&aff_id=7761',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5DQ1c0NkM5WEUiLCJjaWQiOiIxfE0wSU5DQ1c0NkM5WEV8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/best-vpn-for-uk?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5DQ1c0NkM5WEUiLCJjaWQiOiIxfE0wSU5DQ1c0NkM5WEV8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks7 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpnmentor?irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vnQZDX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vnQZDX3sQ40&shareid=',
      link2:
        'https://www.cyberghostvpn.com/offer/bestca?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU5HSFowTk80Q0giLCJjaWQiOiIxfE0wSU5HSFowTk80Q0h8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312123_o&aff_id=1004&source=bestCAen',
      link3:
        'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU5HSFowTk80Q0giLCJjaWQiOiIxfE0wSU5HSFowTk80Q0h8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312123_o&noForceCondition=true&aff_id=7761&source=general',
      link4:
        'https://www.ipvanish.com/vpn-locations/canada-vpn/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=217',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5HSFowTk80Q0giLCJjaWQiOiIxfE0wSU5HSFowTk80Q0h8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/best-vpn-for-canada?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5HSFowTk80Q0giLCJjaWQiOiIxfE0wSU5HSFowTk80Q0h8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks8 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software/vpn-android?xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1viX9DX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1viX9DX3sQ40&shareid=&irgwc=1',
      link2:
        'https://www.cyberghostvpn.com/offer/flash-devices?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU5NUVRSSTRNNU0iLCJjaWQiOiIxfE0wSU5NUVRSSTRNNU18MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312128_o&noForceCondition=true&aff_id=1004&source=androiden',
      link3:
        'https://www.privateinternetaccess.com/offer/android-security?source=android&coupon=2Y2M&brand=vpnMentorb&aff_sub4=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU5NUVRSSTRNNU0iLCJjaWQiOiIxfE0wSU5NUVRSSTRNNU18M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312128_o&aff_id=7761',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5NUVRSSTRNNU0iLCJjaWQiOiIxfE0wSU5NUVRSSTRNNU18NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/best-vpn/vpn-android/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/android?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5NUVRSSTRNNU0iLCJjaWQiOiIxfE0wSU5NUVRSSTRNNU18N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks9 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software/vpn-ios?xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vE31DX3sQ40&shareid=&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vE31DX3sQ40&irgwc=1',
      link2:
        'https://www.cyberghostvpn.com/offer/vpn-for-iphone?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU5QNVIwMVpXNzEiLCJjaWQiOiIxfE0wSU5QNVIwMVpXNzF8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312130_o&noForceCondition=true&aff_id=1004&source=iosen',
      link3:
        'https://www.privateinternetaccess.com/offer/ios-security?coupon=2Y2M&brand=vpnmentorb&aff_sub=eyJwaWQiOiIxfE0wSU5QNVIwMVpXNzEiLCJjaWQiOiIxfE0wSU5QNVIwMVpXNzF8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312130_o&aff_id=7761&source=ios',
      link4:
        'https://www.ipvanish.com/vpn-setup/ios/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=218',
      link5:
        'https://nordvpn.com/ru/special/vpn-for-ios/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5QNVIwMVpXNzEiLCJjaWQiOiIxfE0wSU5QNVIwMVpXNzF8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/ios?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5QNVIwMVpXNzEiLCJjaWQiOiIxfE0wSU5QNVIwMVpXNzF8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks10 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software/vpn-mac?irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vBzFDX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vBzFDX3sQ40&shareid=',
      link2:
        'https://www.cyberghostvpn.com/offer/vpn-for-mac?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU5UUlUzQVFLMUkiLCJjaWQiOiIxfE0wSU5UUlUzQVFLMUl8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312133_o&noForceCondition=true&aff_id=1004&source=bestMACEN',
      link3:
        'https://www.privateinternetaccess.com/offer/mac-security?source=macen&coupon=2Y2M&brand=vpnMentorb&aff_sub4=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU5UUlUzQVFLMUkiLCJjaWQiOiIxfE0wSU5UUlUzQVFLMUl8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312134_o&aff_id=7761',
      link4:
        'https://www.ipvanish.com/mac-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=32',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5UUlUzQVFLMUkiLCJjaWQiOiIxfE0wSU5UUlUzQVFLMUl8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/best-vpn/vpn-mac/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/macos?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5UUlUzQVFLMUkiLCJjaWQiOiIxfE0wSU5UUlUzQVFLMUl8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks11 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software/vpn-router-1?shareid=&irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vBTFDX3sQ40&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vBTFDX3sQ40',
      link2:
        'https://www.cyberghostvpn.com/download/vpn-router?media_source=inhouse_affiliates&transaction_id=102c5d1351737a1d8ce561f8cd278a&affiliate=1004&offer_id=693&ad=&coupon=2Y2Mb&conversionpoint=externalCP&channel=External+LPs&affiliate_google_clientid={affiliate_google_clientid}&utm_medium=affiliate&utm_source=1004&campaign=promo',
      link3:
        'https://www.privateinternetaccess.com/offer/discount?coupon=2Y2M&aff_sub=eyJwaWQiOiIxfE0wSU5XSUE1SzVVTUIiLCJjaWQiOiIxfE0wSU5XSUE1SzVVTUJ8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312136_o&noForceCondition=true&aff_id=7761&source=general',
      link4:
        'https://www.ipvanish.com/vpn-setup/routers/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=221',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU5XSUE1SzVVTUIiLCJjaWQiOiIxfE0wSU5XSUE1SzVVTUJ8Nnw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU5XSUE1SzVVTUIiLCJjaWQiOiIxfE0wSU5XSUE1SzVVTUJ8OHwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks12 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software?irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vGUpDX3sQ40&shareid=&irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vGUpDX3sQ40',
      link2:
        'https://www.cyberghostvpn.com/offer/vpn-for-windows-pc?&coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU8wUVlCSUVGRkQiLCJjaWQiOiIxfE0wSU8wUVlCSUVGRkR8MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312139_o&noForceCondition=true&aff_id=1004&source=windowsen',
      link3:
        'https://www.privateinternetaccess.com/offer/security?coupon=2Y2M&brand=vpnmentorb&aff_sub=eyJwaWQiOiIxfE0wSU8wUVlCSUVGRkQiLCJjaWQiOiIxfE0wSU8wUVlCSUVGRkR8M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312139_o&noForceCondition=true&aff_id=7761&source=windows',
      link4:
        'https://www.ipvanish.com/vpn-mentor/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=30',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU8wUVlCSUVGRkQiLCJjaWQiOiIxfE0wSU8wUVlCSUVGRkR8NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU8wUVlCSUVGRkQiLCJjaWQiOiIxfE0wSU8wUVlCSUVGRkR8N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks13 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/vpn-software/vpn-windows?xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1vGSxDX3sQ40&shareid=&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1vGSxDX3sQ40&irgwc=1',
      link2:
        'https://www.cyberghostvpn.com/offer/windows?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSU8zN0wyU1ZWTE4iLCJjaWQiOiIxfE0wSU8zN0wyU1ZWTE58MnwxNjE1IiwicyI6IjEifQ&aff_sub2=D202408312141_o&noForceCondition=true&aff_id=1004&source=windowsen',
      link3:
        'https://www.privateinternetaccess.com/offer/security?coupon=2Y2M&brand=vpnmentorb&aff_sub=eyJwaWQiOiIxfE0wSU8zN0wyU1ZWTE4iLCJjaWQiOiIxfE0wSU8zN0wyU1ZWTE58M3wxMTE5IiwicyI6IjEifQ&aff_sub2=D202408312141_o&noForceCondition=true&aff_id=7761&source=windows',
      link4:
        'https://www.ipvanish.com/?transaction_id=102f94b57f557d7fd91dc8f3aa3745&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=215',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSU8zN0wyU1ZWTE4iLCJjaWQiOiIxfE0wSU8zN0wyU1ZWTE58NXw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/best-vpn/vpn-windows/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deal/windows?aff=vpnmentor&coupon=vpnmentor&transaction_id=102d101dece884ae406fd4043b3ba6&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSU8zN0wyU1ZWTE4iLCJjaWQiOiIxfE0wSU8zN0wyU1ZWTE58N3wxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinks14 = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/features/free-trial?shareid=&irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1Mt24PVVo1g0&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1Mt24PVVo1g0',
      link2:
        'https://www.cyberghostvpn.com/offer/risk-free-x?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8MXwxNjE1IiwicyI6IjEifQ&aff_sub2=D202409010731_o&noForceCondition=true&aff_id=1004&source=riskEN',
      link3:
        'https://www.privateinternetaccess.com/offer/risk-free?coupon=2Y2M&brand=vpnmentorb&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8MnwxMTE5IiwicyI6IjEifQ&aff_sub2=D202409010732_o&noForceCondition=true&aff_id=7761&source=risken',
      link4:
        'https://www.ipvanish.com/try-mentor/?transaction_id=1029bac89eda6818b256c21532ac96&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=33',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8NHw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102a90d1b6e12d5903f5a5aec5218a&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block1')
  }
  const setNewLinksRu = () => {
    const newLinks = {
      link1:
        'https://www.expressvpn.com/go/features/free-trial?shareid=&irgwc=1&xvcid=XQN10l1zVxyKRa30qrT6uyWVUkC1Mt24PVVo1g0&irclickid=XQN10l1zVxyKRa30qrT6uyWVUkC1Mt24PVVo1g0',
      link2:
        'https://www.cyberghostvpn.com/offer/risk-free-x?coupon=2Y2Mb&brand=vpnmentor&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8MXwxNjE1IiwicyI6IjEifQ&aff_sub2=D202409010731_o&noForceCondition=true&aff_id=1004&source=riskEN',
      link3:
        'https://www.privateinternetaccess.com/offer/risk-free?coupon=2Y2M&brand=vpnmentorb&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8MnwxMTE5IiwicyI6IjEifQ&aff_sub2=D202409010732_o&noForceCondition=true&aff_id=7761&source=risken',
      link4:
        'https://www.ipvanish.com/try-mentor/?transaction_id=1029bac89eda6818b256c21532ac96&offer_id=10&utm_source=1026&utm_medium=affiliate&utm_campaign=10&utm_term=33',
      link5:
        'https://nordvpn.com/ru/special/?utm_medium=affiliate&utm_term=&utm_content=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8NHw0MTM1NyIsInMiOiIxIn0&utm_campaign=off51&utm_source=aff826',
      link6: 'https://privatevpn.com/',
      link7: 'https://www.totalvpn.com/buy-now',
      link8:
        'https://surfshark.com/deals?aff=vpnmentor&coupon=vpnmentor&transaction_id=102a90d1b6e12d5903f5a5aec5218a&offer_id=40&affiliate_id=1355&source=&aff_sub=eyJwaWQiOiIxfE0wSjk2WE5STVhaUDUiLCJjaWQiOiIxfE0wSjk2WE5STVhaUDV8NnwxMTg3MTkiLCJzIjoiMSJ9&utm_source=Affiliates&utm_medium=1355&utm_campaign=affiliate&recurring_goal_id=7',
      link9:
        'https://us.norton.com/products/norton-vpn?SID=eyJwaWQiOiIxfE0wTDhDR0tFM1lZVkgiLCJjaWQiOiIxfE0wTDhDR0tFM1lZVkh8MXw1NjA1MCIsInMiOiIxIn0&cjid=100130848&clickid=82f67a79694a11ef821d361a0a18b8fb&af_sub4=aff&af_sub5=CJ&c=CJ&cjevent=82f67a79694a11ef821d361a0a18b8fb',
      link1Ru: 'https://freevpnplanet.com/',
      link2Ru: 'https://vpnsatoshi.com/',
      link3Ru: 'https://www.astrill.com/',
      link4Ru: 'https://protonvpn.com/',
    }
    setLinks(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
    setVisibleBlock('block2')
  }

  return (
    <LinksContext.Provider
      value={{
        links,
        visibleBlock,
        setNewLinks1,
        setNewLinks2,
        setNewLinks3,
        setNewLinks4,
        setNewLinks5,
        setNewLinks6,
        setNewLinks7,
        setNewLinks8,
        setNewLinks9,
        setNewLinks10,
        setNewLinks11,
        setNewLinks12,
        setNewLinks13,
        setNewLinks14,
        setNewLinksRu,
      }}
    >
      {children}
    </LinksContext.Provider>
  )
}

export const useLinks = () => useContext(LinksContext)
