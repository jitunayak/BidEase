import { Colors } from "@/src/Constanst";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function profile() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          padding: 8,
          backgroundColor: Colors.background,
          gap: 8,
        }}
      >
        <View
          style={{
            padding: 8,
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 8,
          }}
        >
          <Image
            source={require("../../assets/images/profile.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              display: "flex",
              alignSelf: "center",
            }}
          />
          <TouchableOpacity>
            <Text style={{ color: Colors.primary, fontSize: 16 }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Text
          style={{
            color: Colors.text,
            fontSize: 20,
            fontWeight: "500",
            paddingLeft: 8,
          }}
        >
          Personal Details
        </Text> */}
        <View
          style={{
            padding: 8,
            flex: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              gap: 16,
              padding: 16,
              borderWidth: 0.5,
              borderColor: Colors.border,
              borderRadius: 8,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Octicons name="person" size={20} color={Colors.primary} />
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 16,
                }}
              >
                Jitu Nayak
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Octicons name="device-mobile" size={20} color={Colors.primary} />
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 16,
                }}
              >
                093 123 4567
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Octicons name="mail" size={20} color={Colors.primary} />
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 16,
                }}
              >
                jitu.nayak@ahouse.in
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            gap: 8,
            padding: 8,
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontSize: 20,
              marginBottom: 8,
              fontWeight: "500",
              marginTop: 16,
            }}
          >
            Individual e-KYC
          </Text>

          {/* Aadhar Card */}
          <View
            style={{
              padding: 16,
              inset: 0,
              borderWidth: 0.6,
              borderRadius: 8,
              width: "100%",
              borderColor: Colors.border,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Octicons name="id-badge" size={20} color={Colors.primary} />
                <Text style={{ color: Colors.text, fontSize: 16 }}>
                  Aadhar Card
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Octicons
                  name="check-circle-fill"
                  size={20}
                  color={Colors.success}
                />
                <Text style={{ color: Colors.success }}>Verified</Text>
              </View>
            </View>
            <Text style={{ color: Colors.secondary, fontSize: 16 }}>
              XXXX-XXXX-1234
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Octicons name="upload" size={20} color={Colors.primary} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>
                Upload Document
              </Text>
            </View>
          </View>

          {/* PAN Verification */}
          <View
            style={{
              padding: 16,
              inset: 0,
              borderWidth: 0.6,
              borderRadius: 8,
              width: "100%",
              borderColor: Colors.border,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Octicons name="file" size={20} color={Colors.primary} />
                <Text style={{ color: Colors.text, fontSize: 16 }}>
                  PAN Card
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Octicons name="clock" size={20} color={Colors.pending} />
                <Text style={{ color: Colors.pending }}>Pending</Text>
              </View>
            </View>
            <Text style={{ color: Colors.secondary, fontSize: 16 }}>
              ABCDE124F
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Octicons name="upload" size={20} color={Colors.primary} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>
                Upload Document
              </Text>
            </View>
          </View>
        </View>

        {/* Credit Limit */}
        <View style={{ width: "100%", gap: 16, padding: 8, marginTop: 16 }}>
          <Text style={{ color: Colors.text, fontSize: 20, fontWeight: "500" }}>
            Credit Limit
          </Text>
          <View
            style={{
              padding: 16,
              inset: 0,
              borderWidth: 0.6,
              borderRadius: 8,
              width: "100%",
              borderColor: Colors.border,
              gap: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "column", gap: 8 }}>
                <Text style={{ color: Colors.secondary, fontSize: 16 }}>
                  Current Credit Limit
                </Text>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 32,
                    fontWeight: "500",
                  }}
                >
                  ₹ 10,00,000
                </Text>
              </View>
              <Octicons name="credit-card" size={32} color={Colors.primary} />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <Text style={{ color: Colors.secondary, fontSize: 16 }}>
                  Available
                </Text>
                <Text style={{ color: Colors.secondary, fontSize: 16 }}>
                  ₹10000
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <Text style={{ color: Colors.secondary, fontSize: 16 }}>
                  Used
                </Text>
                <Text style={{ color: Colors.secondary, fontSize: 16 }}>
                  ₹5000
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                padding: 16,
                borderRadius: 8,
                width: "auto",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ color: Colors.background, fontSize: 16 }}>
                Request limit increase
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
